export type ClassValue = string | null | undefined | false

export function cn(...classes: Array<ClassValue>): string {
    return classes.filter(Boolean).join(' ')
}
