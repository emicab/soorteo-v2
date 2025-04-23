

const UploadExcel = ({file, handleFileChange, handleUpload, setLoadingExcel}) => {
  return (
    <div className="mt-8 mb-10 flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
          ¿Tenés un Excel con tus números?
        </h3>
        <p className="text-sm text-gray-500 mb-4 text-center max-w-sm">
          Podés importar los datos de tu rifa cargando un archivo <strong>.xlsx</strong> con los números, compradores y estado.
        </p>
        <form onSubmit={handleUpload} className="flex flex-col items-center gap-2 w-full max-w-xs">
          <label className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer px-4 py-3 text-center text-gray-700 hover:bg-gray-200 transition">
            <input type="file" accept=".xlsx" onChange={handleFileChange} className="hidden" />
            {file ? file.name : "Seleccionar archivo"}
          </label>

          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold uppercase py-2 px-4 rounded-2xl transition disabled:bg-violet-300 disabled:cursor-not-allowed"
            disabled={!file}
            
          >
            Cargar datos
          </button>
        </form>
      </div>
  )
}

export default UploadExcel