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
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	isOpen: boolean;
	toggleForm: () => void;
	formOptions: {
		selectedFormOptions: ArticleStateType;
		setSelectedFormOptions: React.Dispatch<
			React.SetStateAction<ArticleStateType>
		>;
	};
	formSubmit: (e: React.FormEvent) => void;
	formReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={props.toggleForm} />

			{props.isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: props.isOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={props.formSubmit}
						onReset={props.formReset}>
						<Text as={'h2'} size={31} uppercase weight={800} family='open-sans'>
							задайте параметры
						</Text>
						<Select
							title='Шрифт'
							selected={props.formOptions.selectedFormOptions.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(selected) => {
								props.formOptions.setSelectedFormOptions((prev) => ({
									...prev,
									fontFamilyOption: selected,
								}));
							}}
						/>
						<RadioGroup
							title='размер шрифт'
							name='fontSize'
							options={fontSizeOptions}
							selected={props.formOptions.selectedFormOptions.fontSizeOption}
							onChange={(selected) => {
								props.formOptions.setSelectedFormOptions((prev) => ({
									...prev,
									fontSizeOption: selected,
								}));
							}}
						/>
						<Select
							title='цвет шрифта'
							selected={props.formOptions.selectedFormOptions.fontColor}
							options={fontColors}
							onChange={(selected) => {
								props.formOptions.setSelectedFormOptions((prev) => ({
									...prev,
									fontColor: selected,
								}));
							}}
						/>
						<Separator />
						<Select
							title='цвет фона'
							selected={props.formOptions.selectedFormOptions.backgroundColor}
							options={backgroundColors}
							onChange={(selected) => {
								props.formOptions.setSelectedFormOptions((prev) => ({
									...prev,
									backgroundColor: selected,
								}));
							}}
						/>
						<Select
							title='ширина контента'
							selected={props.formOptions.selectedFormOptions.contentWidth}
							options={contentWidthArr}
							onChange={(selected) => {
								props.formOptions.setSelectedFormOptions((prev) => ({
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
			)}
		</>
	);
};
