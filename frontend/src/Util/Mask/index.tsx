import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

export const CpfMaskCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
            placeholderChar={'\u2000'}
        />
    );
}

export const CnpjMaskCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
            placeholderChar={'\u2000'}
        />
    );
}

export const RgMaskCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
            placeholderChar={'\u2000'}
        />
    );
}

export const TelefoneMaskCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
            placeholderChar={'\u2000'}
        />
    );
}

export const NirfMaskCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,]}
            placeholderChar={'\u2000'}
        />
    );
}