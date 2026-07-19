import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./CampoFormulario.module.css";

type CampoBaseProps = {
    label?: ReactNode;
    containerClassName?: string;
    icone?: ReactNode;
};

type InputProps = CampoBaseProps & ComponentPropsWithoutRef<"input">;
type TextareaProps = CampoBaseProps & ComponentPropsWithoutRef<"textarea">;

function classes(...nomes: Array<string | undefined>): string {
    return nomes.filter(Boolean).join(" ");
}
export function Input({
    label,
    containerClassName,
    className,
    id,
    icone,
    ...props
}: InputProps) {
    const campo = (
        // Trocado <form> por <div> — só serve pra agrupar visualmente
        // o ícone e o input, sem nenhum significado de "formulário".
        <div className={styles.campoComIcone}>
            {icone && <span className={styles.icone}>{icone}</span>}
            <input
                id={id}
                className={classes(
                    styles.campo,
                    icone ? styles.campoComEspacoIcone : "",
                    className,
                )}
                {...props}
            />
        </div>
    );

    if (!label) return campo;

    return (
        <div className={classes(styles.grupo, containerClassName)}>
            <label className={styles.rotulo} htmlFor={id}>
                {label}
            </label>
            {campo}
        </div>
    );
}

export function Textarea({
    label,
    containerClassName,
    className,
    id,
    ...props
}: TextareaProps) {
    const campo = (
        <textarea
            id={id}
            className={classes(styles.campo, styles.textarea, className)}
            {...props}
        />
    );

    if (!label) return campo;

    return (
        <div className={classes(styles.grupo, containerClassName)}>
            <label className={styles.rotulo} htmlFor={id}>
                {label}
            </label>
            {campo}
        </div>
    );
}
