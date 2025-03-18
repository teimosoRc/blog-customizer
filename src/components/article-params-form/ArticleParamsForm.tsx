import { useEffect, useState } from 'react';
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
	fontColors,
	fontFamilyOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setCurrentStyle: (v: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setCurrentStyle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedFormOptions, setSelectedFormOptions] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const closeForm = () => {
		setIsOpen(false);
	};

	const formReset = () => {
		setSelectedFormOptions(defaultArticleState);
		setCurrentStyle(defaultArticleState);
	};

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentStyle(selectedFormOptions);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeForm();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<div
				onClick={closeForm}
				className={clsx(styles.overlay, {
					[styles.overlay_open]: isOpen,
				})}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={formSubmit} onReset={formReset}>
					<Text as={'h2'} size={31} uppercase weight={800} family='open-sans'>
						задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectedFormOptions.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) => {
							setSelectedFormOptions((prev) => ({
								...prev,
								fontFamilyOption: selected,
							}));
						}}
					/>
					<RadioGroup
						title='размер шрифт'
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFormOptions.fontSizeOption}
						onChange={(selected) => {
							setSelectedFormOptions((prev) => ({
								...prev,
								fontSizeOption: selected,
							}));
						}}
					/>
					<Select
						title='цвет шрифта'
						selected={selectedFormOptions.fontColor}
						options={fontColors}
						onChange={(selected) => {
							setSelectedFormOptions((prev) => ({
								...prev,
								fontColor: selected,
							}));
						}}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={selectedFormOptions.backgroundColor}
						options={backgroundColors}
						onChange={(selected) => {
							setSelectedFormOptions((prev) => ({
								...prev,
								backgroundColor: selected,
							}));
						}}
					/>
					<Select
						title='ширина контента'
						selected={selectedFormOptions.contentWidth}
						options={contentWidthArr}
						onChange={(selected) => {
							setSelectedFormOptions((prev) => ({
								...prev,
								contentWidth: selected,
							}));
						}}
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
