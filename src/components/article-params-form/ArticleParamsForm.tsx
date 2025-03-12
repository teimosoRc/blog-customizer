import { useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	fontColors,
	fontFamilyOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedFontFamily, setSelectedFontFamily] =
		useState<OptionType | null>(null);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(
		null
	);
	const [selectedContentWidth, setSelectedContentWidth] =
		useState<OptionType | null>(null);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType | null>(
		null
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);

	const Opener = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={Opener} />

			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text as={'h2'} size={31} uppercase weight={800} family='open-sans'>
							задайте параметры
						</Text>
						<Select
							title='Шрифт'
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							onChange={(selected) => setSelectedFontFamily(selected)}
						/>
						<RadioGroup
							title='размер шрифт'
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={(selected) => setSelectedFontSize(selected)}
						/>
						<Select
							title='цвет шрифта'
							selected={selectedFontColor}
							options={fontColors}
							onChange={(selected) => setSelectedFontColor(selected)}
						/>
						<Separator />
						<Select
							title='цвет фона'
							selected={selectedBgColor}
							options={backgroundColors}
							onChange={(selected) => setSelectedBgColor(selected)}
						/>
						<Select
							title='ширина контента'
							selected={selectedContentWidth}
							options={contentWidthArr}
							onChange={(selected) => setSelectedContentWidth(selected)}
						/>
						<div className={clsx(styles.bottomContainer)}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
