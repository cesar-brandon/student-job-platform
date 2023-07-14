import Button from "./Button";

const PostFilters = () => {
  return (
    <div className="flex gap-4">
      <Button
        text="Experiencia"
        className="border-2 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-sm text-blue-500 font-semibold py-2 px-4 rounded-full transition"
      />
      <Button
        text="Carga Horaria"
        className="border-2 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-sm text-blue-500 font-semibold py-2 px-4 rounded-full transition"
      />
      <Button
        text="Modalidad"
        className="border-2 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-sm text-blue-500 font-semibold py-2 px-4 rounded-full transition"
      />
    </div>
  );
};

export default PostFilters;
