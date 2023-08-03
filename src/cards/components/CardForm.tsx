import React, { ChangeEvent, FC } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import Joi from "joi";
import {
  CardFromClientType,
  CreateCardErrors,
} from "../models/types/cardTypes";
import { useUser } from "../../users/providers/UserProvider";

type Props = {
  title?: string;
  onSubmit: () => void;
  onReset: () => void;
  onFormChange: () => Joi.ValidationError | null;
  errors: CreateCardErrors;
  data: CardFromClientType;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CardForm: FC<Props> = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
}) => {
  const { user } = useUser();
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onFormChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
      spacing={1}
      to={ROUTES.CARDS}
    >
      <Input
        name="title"
        label="title"
        error={errors.title}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="subtitle"
        label="subtitle"
        error={errors.subtitle}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="description"
        label="description"
        error={errors.description}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="webUrl"
        label="web"
        error={errors.webUrl}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="imageUrl"
        label="image url"
        error={errors.imageUrl}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="imageAlt"
        label="image alt"
        error={errors.imageAlt}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="state"
        label="state"
        error={errors.state}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="country"
        label="country"
        error={errors.country}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="houseNumber"
        label="houseNumber"
        type="number"
        error={errors.houseNumber ? errors.houseNumber.toString() : ""}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="zip"
        label="zip"
        type="number"
        error={errors.zip ? errors.zip.toString() : ""}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      {/* {user!.isAdmin && (
        <Input
          name="bizNumber"
          label="bizNumber"
          type="number"
          error={errors.bizNumber ? errors.bizNumber.toString() : ""}
          onInputChange={onInputChange}
          data={data}
          breakPoints={{ sm: 6 }}
          required={false}
        />
      )} */}
    </Form>
  );
};

export default React.memo(CardForm);
