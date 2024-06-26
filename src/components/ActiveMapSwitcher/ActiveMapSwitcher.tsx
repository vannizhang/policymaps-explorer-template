import * as React from 'react';
import classnames from 'classnames';

import { NavBtn } from '../';

interface Props {
    isMinimal: boolean;

    activeItemId: string;
    activeItemTitle: string;
    allItemIds: string[];

    activeItemIdOnChange: (itemId: string) => void;
}

const ActiveMapSwitcher: React.FC<Props> = ({
    isMinimal,

    activeItemId,
    activeItemTitle,
    allItemIds,
    activeItemIdOnChange,
}: // allItemIds,
// activeItemIdOnChange
Props) => {
    const getIndexForActiveWebmap = () => {
        return allItemIds.indexOf(activeItemId);
    };

    const showNext = () => {
        const index = getIndexForActiveWebmap();

        const nextItemId: string =
            index + 1 < allItemIds.length
                ? allItemIds[index + 1]
                : allItemIds[0];

        activeItemIdOnChange(nextItemId);
    };

    const showPrev = () => {
        const index = getIndexForActiveWebmap();

        const prevItemId: string =
            index - 1 >= 0
                ? allItemIds[index - 1]
                : allItemIds[allItemIds.length - 1];

        activeItemIdOnChange(prevItemId);
    };

    // get message that indicate the position of active webmap in the item collections (e.g. Map 2 of 5)
    const getActiveItemIndicator = () => {
        const index = getIndexForActiveWebmap();

        if (index === -1) {
            return null;
        }

        const text = `Map ${index + 1} of ${allItemIds.length}`;

        return (
            <div
                className="tablet-hide"
                style={{
                    padding: '0 .5rem',
                    display: !isMinimal ? 'block' : 'none',
                }}
            >
                <span>{text}</span>
            </div>
        );
    };

    const getNavBtns = () => {
        // if(showTitleOnly){
        //     return null;
        // }

        return (
            <>
                <div style={{ padding: '0 .25rem' }}>
                    <NavBtn
                        direction="left"
                        onClick={showPrev}
                        isDisabled={getIndexForActiveWebmap() === -1}
                    />
                </div>

                <div style={{ padding: '0 .25rem' }}>
                    <NavBtn
                        direction="right"
                        onClick={showNext}
                        isDisabled={getIndexForActiveWebmap() === -1}
                    />
                </div>
            </>
        );
    };

    return (
        <div
            className={'active-map-switcher'}
            style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: '10px',

                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignContent: 'center',
                alignItems: 'center',
                padding: '0 .75rem',
                boxSizing: 'border-box',
            }}
        >
            <div
                className={classnames(
                    'active-map-title avenir-demi font-size--0',
                    { 'text-ellipsis': !isMinimal }
                )}
                style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: '1px',
                }}
            >
                <span title={activeItemTitle}>{activeItemTitle}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                {getActiveItemIndicator()}

                {getNavBtns()}
            </div>
        </div>
    );
};

export default ActiveMapSwitcher;
