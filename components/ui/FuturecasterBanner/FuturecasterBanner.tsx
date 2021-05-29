import { useState } from 'react';
import s from './FuturecasterBanner.module.css';

const themeContents = [
    {
        altText: 'A skeleton reaches its hand to the sky',
        buttonText: 'Cast Your Future',
        image: '/skeleton.jpg',
    },
    {
        altText: 'A skeleton reaches its hand to the sky',
        buttonText: 'Shake the Magic Eight-Ball',
        image: '/skeleton.jpg',
    },
];
const themeId = Math.floor(Math.random() * themeContents.length);
const themeContent = themeContents[themeId];
const fortunes = ['You will have a wicked evening and some mad good sleep.', 'Drink a potion and get in motion babyyyy! Ayyyy!'];

export const FortuneCasterButton = () => {
    // TODO: use redux + http request for server-driven fortune
    const [fortuneText, setFortuneText] = useState<null | string>(null);

    const handleClick = () => {
        if (fortuneText === fortunes[0]) {
            setFortuneText(fortunes[1]);
        } else {
            setFortuneText(fortunes[0]);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            {fortuneText && (
                <div className={s['futurecaster-row']}>
                    {/* TODO: randomize button text ['Cast Your Future', 'Shake the Eight Ball', 'Open a Fortune Cookie', 'Read Palms', 'Read Astrology'] */}
                    <p style={{ display: 'block', margin: '1rem auto' }}>{fortuneText}</p>
                </div>
            )}

            <div className={s['futurecaster-row']}>
                <button className={s['futurecaster-button']} onClick={handleClick}>
                    {themeContent.buttonText}
                </button>
            </div>

            <div className={s['futurecaster-row']}>
                <p style={{ margin: 'auto' }}>Theme ID {themeId}</p>
            </div>
        </div>
    );
};

export const FuturecasterBanner = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ background: 'linear-gradient(45deg, #7c7a7e, #0000)' }}>
            {/* TODO: use image_2_html https://www.npmjs.com/package/image_2_html */}

            <div className={`${s['hidden-on-medium']} ${s['futurecaster-column']}`}>
                <FortuneCasterButton />
            </div>

            <div className={s['futurecaster-column']}>
                <img alt={themeContent.altText} src={themeContent.image} style={{ height: '100%', objectFit: 'cover' }} />
            </div>

            <div className={`${s['hidden-until-medium']} ${s['futurecaster-column']}`}>
                <FortuneCasterButton />
            </div>
        </div>
    );
};
