
interface ModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    title: string
    children: React.ReactNode
}

interface ModalContentProps {
    setOpen: (value: boolean) => void
    sectionName?: any
    enrollmentsData?: any
}


export type { ModalProps, ModalContentProps }