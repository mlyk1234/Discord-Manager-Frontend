export const Bounded = ({children}: {children: JSX.Element | JSX.Element[] | any }) => {
    return <div className="flex flex-col gap-5">
        {children}
    </div>
}