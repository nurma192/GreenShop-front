import React, { useState } from 'react';
import {
    CircularProgress,
    Select,
    SelectItem,
    Checkbox,
    CheckboxGroup,
} from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MyButton from "../components/ui/MyButton";
import { useCategoriesData } from "../api/categoriesApi";
import { useAddItem } from "../api/addItemApi";
import MyMiniImage from "../components/ui/MyMiniImage";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import MyTextarea from "../components/ui/MyTextarea";
import { MyInput } from "../components/ui/MyInput";

export type AddItemFormBody = {
    title: string;
    shortDescription: string;
    cost: string;
    size: string;
    categories: string[];
    productDescription: string;
    images?: File[];
}

function AddItem() {
    const { handleSubmit, control, formState: { errors } } = useForm<AddItemFormBody>();
    const categoriesData = useCategoriesData();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const { mutate: addItem, isLoading, isError, error } = useAddItem();
    const [mainImage, setMainImage] = useState<number>(0);

    const onSubmitAddItem: SubmitHandler<AddItemFormBody> = async (data) => {
        const formData = { ...data, images: images };
        console.log("Submitting formData:", formData);
        addItem(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length + images.length > 10) {
                alert("You can choose only up to 10 images");
                return;
            }
            const files = Array.from(e.target.files);
            setImages([...images, ...files]);

            const previewUrls = files.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previewUrls]);
        }
    };

    const deleteImage = (index: number) => {
        setImages(images.filter((_, id) => id !== index));
        setImagePreviews(imagePreviews.filter((_, id) => id !== index));
        if (mainImage >= imagePreviews.length - 1) {
            setMainImage(imagePreviews.length - 2 >= 0 ? imagePreviews.length - 2 : 0);
        }
    };

    const nextPhoto = () => {
        setMainImage(prevState => prevState + 1);
    };

    const prevPhoto = () => {
        setMainImage(prevState => prevState - 1);
    };

    const sizes = [
        { label: "Small", key: "S" },
        { label: "Medium", key: "M" },
        { label: "Large", key: "L" },
        { label: "Extra Large", key: "XL" },
    ];

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            <div className="w-full md:w-1/2 flex flex-col md:flex-col-reverse xl2:flex-row gap-2">
                <div className="w-full flex flex-row md:grid md:grid-cols-3 md:w-full xl2:w-1/5 xl2:flex xl2:flex-col gap-4">
                    {imagePreviews.map((image, index) => (
                        <MyMiniImage
                            key={index}
                            src={image}
                            className={`cursor-pointer ${mainImage === index && 'border-primary border-2'}`}
                            onClick={() => setMainImage(index)}
                        />
                    ))}
                    {Array.from({ length: 5 - imagePreviews.length }).map((_, index) => (  // Adjusted to 10 max images
                        <MyMiniImage key={index} src={'/icons/addPhoto-scelet.svg'} />
                    ))}
                </div>
                <div className="w-full xl2:w-4/5">
                    <div className="w-full aspect-square bg-zinc-50 relative select-none my-2">
                        <button
                            onClick={prevPhoto}
                            disabled={imagePreviews.length === 0 || mainImage === 0}
                            className={`absolute h-[40px] m-auto cursor-pointer bottom-0 left-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden`}
                        >
                            <HiChevronLeft size="2rem" color={"white"} />
                        </button>
                        <button
                            onClick={nextPhoto}
                            disabled={imagePreviews.length === 0 || mainImage === imagePreviews.length - 1}
                            className={`absolute h-[40px] m-auto cursor-pointer bottom-0 right-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden`}
                        >
                            <HiChevronRight size="2rem" color={'white'} />
                        </button>

                        {imagePreviews.length <= 0 && (
                            <img className='w-full h-full object-cover' src="/icons/addPhoto-scelet.svg" alt="Add Photo Placeholder" />
                        )}
                        {imagePreviews.length > 0 && (
                            <img className='w-full h-full object-cover' src={imagePreviews[mainImage]} alt={`Preview ${mainImage}`} />
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <h2>Item Details</h2>
                <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit(onSubmitAddItem)}>
                    {/* Title Input */}
                    <MyInput
                        name='title'
                        label="Title"
                        control={control}
                        required="Item title is required"
                    />

                    {/* Short Description Input */}
                    <MyInput
                        name='shortDescription'
                        label="Short Description"
                        control={control}
                        required="Short Description is required"
                    />

                    {/* Size and Cost */}
                    <div className="w-full flex items-center justify-center gap-2">
                        {/* Size Select */}
                        <Controller
                            name="size"
                            control={control}
                            rules={{ required: "Select a size" }}
                            render={({ field }) => (
                                <div className="w-60">
                                    <Select
                                        value={field.value}
                                        isInvalid={!!errors.size}
                                        items={sizes}
                                        onChange={(val) => field.onChange(val)}
                                        placeholder="Select size"
                                        classNames={{
                                            trigger: "rounded border border-neural-700 bg-white",
                                        }}
                                    >
                                        {sizes.map((sort) => (
                                            <SelectItem key={sort.key}>{sort.label}</SelectItem>
                                        ))}
                                    </Select>
                                    {errors.size && (
                                        <span className="text-red-500 text-sm">
                                            {errors.size.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                        {/* Cost Input */}
                        <MyInput
                            name='cost'
                            label="Cost"
                            control={control}
                            labelPlacement="outside-left"
                            required="Cost is required"
                            placeholder="0.00"
                            type="number"
                        />
                    </div>

                    {/* Categories Checkbox Group */}
                    <Controller
                        name="categories"
                        control={control}
                        rules={{ required: "Please select at least one category." }}
                        render={({ field }) => (
                            <CheckboxGroup
                                label="Select categories"
                                isRequired
                                isInvalid={!!errors.categories}
                                {...field}
                                onValueChange={(value) => field.onChange(value)}
                                className={`w-full`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                                    {categoriesData.isSuccess && categoriesData.data.categories.map((category) => (
                                        <Checkbox key={category.id} value={category.id}>{category.name}</Checkbox>
                                    ))}
                                </div>
                            </CheckboxGroup>
                        )}
                    />
                    {errors.categories && <span className="text-red-500 text-sm">{errors.categories.message}</span>}

                    {/* Product Description */}
                    <MyTextarea
                        name='productDescription'
                        label="Product Description"
                        placeholder="Enter your description"
                        control={control}
                        required="Description is required"
                    />

                    {/* Image Upload Section */}
                    <div className="mt-4 w-full">
                        <label className="block">Upload Images</label>
                        <div className="flex gap-2 flex-wrap">
                            {imagePreviews.map((image, index) => (
                                <div key={index} className="w-[100px] h-[100px] bg-neutral-300 relative rounded-lg">
                                    <button
                                        type='button'
                                        className="absolute top-[-5px] right-[-5px] bg-red-500 p-1 rounded-2xl text-white"
                                        onClick={() => deleteImage(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="white"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-2"
                            disabled={images.length >= 10}
                        />
                        {images.length >= 10 && <span className="text-red-500 text-sm">Maximum 10 images allowed.</span>}
                    </div>

                    {/* Submit Button and Loading Indicator */}
                    <div className="flex items-start gap-2">
                        <MyButton
                            color="primary"
                            type="submit"
                            className="w-[100px] py-2 px-4"
                            disabled={isLoading}
                        >
                            Add Item
                        </MyButton>
                        {isLoading && (
                            <CircularProgress
                                color='primary'
                                size="lg"
                                label="Adding item..."
                            />
                        )}
                    </div>
                </form>
                {/* Error Message */}
                {isError && (error instanceof Error) && (
                    <span className="text-red-500 text-sm">{error.message}</span>
                )}
            </div>
        </div>
    );
}

export default AddItem;
