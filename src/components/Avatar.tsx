import "./Avatar.css";

type Props = {
  src: string;
};

export default function Avatar({ src }: Props) {
  return (
    <div className="avatar">
      <img src={src} alt="User avatar" />
    </div>
  );
}
