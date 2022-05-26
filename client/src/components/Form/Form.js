export default function Form() {
  return (
    <div className="form-create-memory">
      <h2>Create a Memory</h2>

      <form>
        <input type="text" name="creator" placeholder="Creator" />

        <input type="text" name="title" placeholder="Title" />

        <textarea name="message" placeholder="Message"/>

        <input type="text" name="tags" placeholder="Tags" />

        <input type="file" name="image" />

        <input type="submit" value="Submit"/>
      </form>

      <button>Clear</button>
    </div>
  )
}