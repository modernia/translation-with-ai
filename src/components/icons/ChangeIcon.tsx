import { component$ } from "@builder.io/qwik";

export default component$((props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M21.71 9.29l-4-4a1 1 0 00-1.42 1.42L18.59 9H7a1 1 0 000 2h14a1 1 0 00.92-.62 1 1 0 00-.21-1.09zM17 13H3a1 1 0 00-.92.62 1 1 0 00.21 1.09l4 4a1 1 0 001.42 0 1 1 0 000-1.42L5.41 15H17a1 1 0 000-2z" />
    </svg>
  );

})