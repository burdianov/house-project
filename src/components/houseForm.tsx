// import { useState, useEffect, ChangeEvent } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { Image } from "cloudinary-react";
// import { SearchBox } from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IProps {}

const HouseForm = ({}: IProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<IFormData>({
    defaultValues: {}
  });

  useEffect(() => {
    register('address', { required: 'Please enter your address' });
    register('latitude', { required: true, min: -90, max: 90 });
    register('longitude', { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {};

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add a New House</h1>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for Your Address
        </label>

        {errors.address && <p>{errors.address.message}</p>}
      </div>
    </form>
  );
};

export default HouseForm;
