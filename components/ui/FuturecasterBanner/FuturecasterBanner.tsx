import { useState } from 'react';
import s from './FuturecasterBanner.module.css';

const fortunes = ['You will have a wicked evening and some mad good sleep.', 'Drink a potion and get in motion babyyyy! Ayyyy!'];

export const FuturecasterBanner = () => {
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
        <div className="flex">
            {/* TODO: use image_2_html https://www.npmjs.com/package/image_2_html */}
            <img className={s['futurecaster-column']} src="/skeleton.jpg" alt="A skeleton reaches its hand to the sky" />

            <div className={s['futurecaster-column']} style={{ background: '#a5a4a8' }}>
                {/* TODO: randomize button text ['Cast Your Future', 'Shake the Eight Ball', 'Open a Fortune Cookie', 'Read Palms', 'Read Astrology'] */}
                <div className={s['futurecaster-row']} style={{ flexGrow: 1 }}>
                    <button className={s['futurecaster-button']} onClick={handleClick}>
                        Cast Your Future
                    </button>
                </div>

                {fortuneText && (
                    <div className={s['futurecaster-row']}>
                        <p style={{ display: 'block', margin: '1rem auto' }}>{fortuneText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
