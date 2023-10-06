'use client';
import React from 'react';
import clsx from 'clsx';
import {useDropzone} from 'react-dropzone';

const KB = 1024;

export default function ImageDropArea({
	className,
	label,
	maxSize,
	...inputProps
}: {
	readonly className?: string;
	readonly label: string;
	readonly maxSize?: number;
} & Omit<React.ComponentProps<'input'>, 'type'>) {
	const {acceptedFiles, getRootProps, getInputProps, fileRejections}
    = useDropzone({
    	accept: {
    		'image/jpeg': ['.jpg', '.jpeg'],
    		'image/png': ['.png'],
    		'image/webp': ['.webp'],
    	},
    	validator:
        maxSize == null
        	? undefined
        	: file => {
        		if (file.size > maxSize * KB) {
        			return {
        				code: 'file-too-large',
        				message: `File must be under ${maxSize} KB in size`,
        			};
        		}

        		return null;
        	},
    	maxFiles: 1,
    });

	const fileTooLarge = fileRejections.length > 0;

	return (
		<label
			{...getRootProps({
				className: clsx(
					'rounded h-32 w-32 relative border mb-4',
					acceptedFiles.length === 0 && 'border-dashed border-stone-700',
					acceptedFiles.length > 0 && 'border-stone-700',
					className,
				),
			})}
			onClick={e => {
				e.stopPropagation();
			}}
		>
			<input {...inputProps} {...getInputProps()}/>
			{acceptedFiles.length > 0 ? (
			// eslint-disable-next-line @next/next/no-img-element
				<img
					className='w-full h-full rounded object-contain p-4'
					alt='userLogo'
					src={URL.createObjectURL(acceptedFiles[0])}
				/>
			) : (
				<div className='w-full h-full rounded p-2 flex flex-col items-center justify-center text-stone-400 gap-2 text-center'>
					<span
						className={clsx(
							'material-symbols-rounded',
							fileTooLarge && 'text-red-200',
						)}
					>
						image
					</span>
					<p className={clsx('text-xs', fileTooLarge && 'text-red-200')}>
						{fileTooLarge
							? `La imagen no puede tener un tamaño mayor a ${maxSize} KB`
							: label}
					</p>
				</div>
			)}
			<div className='absolute w-full h-full left-0 z-10 top-0 bg-stone-50 opacity-0 hover:opacity-5'/>
		</label>
	);
}
