import { type getTypesOfButtonProps } from "../../types/common/components"

export function getTypesOfButton(props: getTypesOfButtonProps) {
    const possibleTypes = ['primary', 'success', 'error', 'secondary', 'info', 'dark', 'warning']
    for (const type of possibleTypes) {
        if (type === props.type) {
            return type
        }
    }
}
