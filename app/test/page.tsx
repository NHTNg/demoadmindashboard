// TEST Server action
export default function Page() {
  const handleForm = async (formData: FormData) => {
    "use server";
    const username = formData.get("username");
    console.log(username);
  };

  return (
    <div>
      <form action={handleForm}>
        <input name="username"></input>
        <button>Send</button>
      </form>
    </div>
  );
}
