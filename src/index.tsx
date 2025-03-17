import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentStyle, setCurrentStyle] = useState<ArticleStateType>({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSizeOption: defaultArticleState.fontSizeOption,
	});

	const [selectedFormOptions, setSelectedFormOptions] =
		useState<ArticleStateType>(currentStyle);

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const closeForm = () => {
		setIsOpen(false);
	};
	const resetForm = () => {
		setSelectedFormOptions(defaultArticleState);
		setCurrentStyle(defaultArticleState);
	};

	const confirmForm = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentStyle(selectedFormOptions);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentStyle.fontFamilyOption.value,
					'--font-size': currentStyle.fontSizeOption.value,
					'--font-color': currentStyle.fontColor.value,
					'--container-width': currentStyle.contentWidth.value,
					'--bg-color': currentStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				toggleForm={toggleForm}
				formOptions={{ selectedFormOptions, setSelectedFormOptions }}
				formSubmit={confirmForm}
				formReset={resetForm}
			/>
			<Article closeForm={closeForm} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
