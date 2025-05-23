'use client';
import React from 'react';
import Link from 'next/link';
import Person from '@material-design-icons/svg/round/person.svg';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import {Button, PopoverButtonTrigger} from 'geostats-ui';

export default function AccountButton() {
	return (
		<PopoverButtonTrigger
			size='md'
			placement='bottom end'
			label={
				<>
					<Person />
					<ArrowDropDown />
				</>
			}
		>
			<Link href='/api/auth/logout'>
				<Button variant='secondary'>Cerrar sesión</Button>
			</Link>
		</PopoverButtonTrigger>
	);
}
