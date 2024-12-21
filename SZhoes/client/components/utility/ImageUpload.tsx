'use client'
import Image from 'next/image';
import { useState, DragEvent, ChangeEvent, useEffect } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa6';
import { UUIDGenerator } from './UUIDGenerator';

export function ImageUploadComp({
    maxImages,
    name,
    setImageFormData,
    setFormData,
    folder
}: {
    maxImages: number;
    name: string;
    setImageFormData: any;
    setFormData: any;
    folder: string,
}) {
    const [previews, setPreviews] = useState<{ uuid: string; base64: string | ArrayBuffer | null; extension: string }[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            displayPreviews(files);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length > 0) {
            displayPreviews(files);
        }
    };

    const displayPreviews = (files: File[]) => {
        const newPreviews = files.slice(0, maxImages - previews.length).map(file => {
            return new Promise<{ uuid: string; base64: string | ArrayBuffer | null; extension: string }>((resolve, reject) => {
                const reader = new FileReader();
                const uuid = UUIDGenerator(); // Generate UUID for each image
                const extension = file.type.split('/')[1]; // Extract file extension from MIME type (e.g., "image/png" -> "png")

                reader.onloadend = () => resolve({ uuid, base64: reader.result, extension: extension });
                reader.onerror = () => reject(new Error("File reading failed"));
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newPreviews)
            .then(results => setPreviews(prev => [...prev, ...results]))
            .catch(error => console.error(error));
    };

    const removeImage = (index: number) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Update formData to include images with UUIDs and extensions, stripping "data:image/png;base64,"
    useEffect(() => {
        setImageFormData((prevData: any) => ({
            ...prevData,
            [name]: previews.map(({ base64, uuid, extension }) => ({
                image: typeof base64 === 'string' ? base64.replace(/^data:image\/[a-zA-Z]+;base64,/, '') : base64,
                uuid: `${uuid}.${extension}` // Append the file extension to the UUID
            }))
        }));
    }, [previews, setImageFormData, name]);

    // Update formData with UUID list, including extensions and folder path
    useEffect(() => {
        const uuidList = previews.map(preview => `${folder}/${preview.uuid}.txt`);
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: uuidList
        }));
    }, [previews, setFormData, name, folder]);
    return (
        <div
            className={`w-full relative border-2 h-fit border-neutral-400 hover:border-neutral-600 border-dashed rounded-lg p-6 ${isDragging ? 'border-indigo-600' : ''}`}
            onDragOver={(e: DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragging(false);
            }}
            onDrop={handleDrop}
        >
            <div className="pointer-events-none absolute inset-0">
                <input
                    type="file"
                    className="w-full h-full opacity-0"
                    onChange={handleChange}
                    multiple
                />
            </div>
            <label htmlFor={name} className="relative cursor-pointer">
                <div className="text-center">
                    <FaUpload className='mx-auto h-12 w-12 my-5' />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        <span>Drag and drop</span>
                        <span className="text-indigo-600"> or browse</span>
                        <span> to upload</span>
                        <input
                            id={name}
                            name={name}
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                            multiple
                        />
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB each
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Maximum {maxImages} images
                    </p>
                </div>
            </label>
            {previews.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                        <div key={preview.uuid} className="relative group">
                            <Image
                                width={0}
                                height={0}
                                src={preview.base64?.toString() || ''}
                                className="w-full h-80"
                                alt={`Preview ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <FaTrash className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
