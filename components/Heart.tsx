export default function Heart({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Heart"
            enableBackground="new 0 0 150 150"
            viewBox="0 0 150 150"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path
                d="m88.26 28.608s-28.35-17.021-47.661-14.466c-19.31 2.553-34.101 17.021-35.745 36.593-1.643 19.573 18.079 48.933 40.265 68.934 22.187 19.999 34.215 25.998 34.215 25.998s15.089-14.936 27.826-27.7c12.736-12.766 39.031-38.297 37.799-62.977-1.233-24.679-17.483-34.912-32.386-35.656-13.354-0.67-24.31 9.271-24.31 9.271z"
            />
        </svg>
    )
}