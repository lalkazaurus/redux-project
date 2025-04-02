import styles from "./Header.module.css"

export default function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.logo}>Yemek.Slovensko</div>
            <ul>
                <li>Контакти</li>
                <li>Розклад</li>
                <li>Записатись</li>
            </ul>
            <div>
                <button>Подати заявку</button>
            </div>
        </header>
    )
}