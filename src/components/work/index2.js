import styles from "@/styles/Work.module.css";
import TextDisperse from "../TextDisperse";

const WorkMenu2 = () => {
  return(
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <TextDisperse className="gap-2 flex text-3xl uppercase leading-8">
        <p>1</p>
        <p>mediterraneo</p>
      </TextDisperse>
      <TextDisperse className="gap-2 flex text-3xl uppercase leading-8">
        <p>2</p>
        <p>dolce vita</p>
      </TextDisperse>
      <TextDisperse className="gap-2 flex text-3xl uppercase leading-8">
        <p>3</p>
        <p>tempelfog</p>
      </TextDisperse>
      <TextDisperse className="gap-2 flex text-3xl uppercase leading-8">
        <p>6</p>
        <p>islas</p>
      </TextDisperse>
      <TextDisperse className="gap-2 flex text-3xl uppercase leading-8">
        <p>4</p>
        <p>johnny color</p>
      </TextDisperse>
      <TextDisperse className="gap-2 flex text-3xl uppercase leading-8">
        <p>5</p>
        <p>späti drop</p>
      </TextDisperse>
    </div>
  )
}

export default WorkMenu2;