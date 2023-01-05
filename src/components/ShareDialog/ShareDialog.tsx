import React from 'react';
import { SupportedSocialMedia } from './ShareDialogContainer';

type Props = {
    currentUrl: string;
    onClose?: () => void;
    shareToSocialMediaOnClick: (name: SupportedSocialMedia) => void;
};

const ShareDialog: React.FC<Props> = ({ currentUrl, onClose }: Props) => {
    const textInputRef = React.useRef<HTMLInputElement>();

    const copyUrl = () => {
        textInputRef.current.select();
        // For mobile devices
        textInputRef.current.setSelectionRange(0, 99999);
        document.execCommand('copy');
    };

    return (
        <div
            style={{
                width: '350px',
                padding: '.75rem',
                paddingBottom: '1rem',
                boxSizing: 'border-box',
                background: '#0079c1',
                border: '1px solid #005e95',
                color: '#fff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            }}
        >
            <div className="trailer-half">
                <span className="font-size--2 avenir-demi">
                    Copy this map to Clipboard
                </span>
                <span
                    className="font-size--2 icon-ui-close right"
                    style={{ cursor: 'pointer' }}
                    onClick={onClose}
                ></span>
            </div>

            <div className="input-group">
                <input
                    ref={textInputRef}
                    readOnly={true}
                    className="input-group-input"
                    type="text"
                    placeholder=""
                    value={currentUrl}
                    style={{
                        height: '2rem',
                        border: '1px solid transparent',
                    }}
                />

                <span className="input-group-button">
                    <button
                        className="btn btn-small"
                        style={{
                            height: '2rem',
                            background: '#005e95',
                            border: '1px solid #005e95',
                        }}
                        onClick={copyUrl}
                    >
                        Copy
                    </button>
                </span>
            </div>
        </div>
    );
};

export default ShareDialog;
