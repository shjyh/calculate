
import type { Metadata } from 'next'
import BaseSetting from './impl'

export const metadata: Metadata = {
    title: "基础练习"
}

export default function BaseSettingPage() {
    return (
        <BaseSetting />
    )
}