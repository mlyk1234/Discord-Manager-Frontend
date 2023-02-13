export const Bounded = ({children}: {children: JSX.Element | JSX.Element[]}) => {
    return <div className="flex flex-col gap-5">
        {children}
    </div>
}