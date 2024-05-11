

const FormHeader = ({header, subheader}) => {
  return (
    <div className="pt-3">
        <p className="font-bold text-4xl text-marine-blue">{header}</p>
        <p className="text-base text-cool-gray">{subheader}</p>
    </div>
  )
}

export default FormHeader