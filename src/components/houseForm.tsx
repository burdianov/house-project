/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { SearchBox } from './searchBox';
import { useAuth } from '../auth/useAuth';

interface IUploadImageResponse {
  secure_url: string;
}

async function createHouse(data: IHouseData) {
  try {
    const url = '/api/houses';
    const response = axios.post(url, {
      data
    });

    return response;
  } catch (err) {
    console.log({ err });
  }
}

async function uploadImage(
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append('file', image);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '');

  const response = await fetch(url, {
    method: 'post',
    body: formData
  });

  return response.json();
}

interface IFormData {
  address: string;
  latitude: number | null;
  longitude: number | null;
  bedrooms: string;
  image: FileList;
}

interface IHouseData {
  uid?: string;
  image: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  bedrooms: string;
}

interface IProps {}

const HouseForm = ({}: IProps) => {
  const router = useRouter();
  const { user, authenticated, logout } = useAuth();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<IFormData>({
    defaultValues: {}
  });

  const [loading, setLoading] = useState(false);

  const address = watch('address');

  useEffect(() => {
    register('address', { required: 'Please enter your address' });
    register('latitude', { required: true, min: -90, max: 90 });
    register('longitude', { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {
    setLoading(true);

    const response = await axios.get('/api/image');

    if (response.data) {
      const { signature, timestamp } = response.data;

      const imageData = await uploadImage(data.image[0], signature, timestamp);

      const houseData = await createHouse({
        uid: user?.uid,
        image: imageData.secure_url,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        bedrooms: data.bedrooms
      });

      console.log({ houseData });

      if (houseData?.data.id) {
        router.push(`/houses/${houseData.data.id}`);
      } else {
        // TODO: error handling
      }
    }
    setLoading(false);
  };

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  const onSelectAddress = (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => {
    setValue('address', address);
    setValue('latitude', latitude);
    setValue('longitude', longitude);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add a New House</h1>

      <div className="mt-4">
        <label htmlFor="search" className="block mb-1">
          Search for Your Address
        </label>
        <SearchBox onSelectAddress={onSelectAddress} defaultValue="" />
        {errors.address && (
          <p className="error-message">{errors.address.message}</p>
        )}
      </div>

      {address && (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
            >
              Click to add image (16:9)
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              {...register('image', {
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) {
                    return true;
                  }
                  return 'Please upload one file';
                },
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  if (event?.target?.files?.[0]) {
                    const file = event.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }
              })}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="house"
                className="mt-4 object-cover w-[576px]"
                style={{ width: '576px', height: `${(9 / 16) * 576}px` }}
              />
            )}
            {errors.image && (
              <p className="error-message">{errors.image.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              Beds
            </label>
            <input
              id="bedrooms"
              type="number"
              className="p-2"
              {...register('bedrooms', {
                required: 'Please enter the number of bedrooms',
                max: { value: 10, message: 'Wooahh, too big of a house' },
                min: { value: 1, message: 'Must have at least 1 bedroom' }
              })}
            />
            {errors.bedrooms && (
              <p className="error-message">{errors.bedrooms.message}</p>
            )}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
            <Link href="/">
              <a>Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default HouseForm;
