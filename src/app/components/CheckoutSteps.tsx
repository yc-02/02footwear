const CheckoutSteps = ({ current = 0 }) => {
    return (
      <ul className="hidden md:flex gap-10 w-full mt-4 justify-center">
        {['Checkout','Shipping','Place Order'].map(
          (step, index) => (
            <div className="flex flex-col items-center" key={step}>
            <li
              key={step}
              className={`rounded-full w-7 text-center text-slate-50
             ${index == current ?"bg-slate-900 ": "bg-slate-300"}
             `}
            >
                <span>
                {index+1}
                </span>
            </li>
            <p className={`${index ==current ?"text-slate-900":"text-slate-200"}`}>{step}</p>
            </div>
          )
        )}
      </ul>
    )
  }
  export default CheckoutSteps