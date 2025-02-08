type UpProps = {
  variation: number;
};

export function Up({ variation }: UpProps) {
  if (variation === 1) {
    return (
      <svg className="svg-icon" fill="none" viewBox="0 0 56 48" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M49.5069 36.9064C43.0696 26.385 38.8694 23.0206 33.5696 10.8047C32.5201 8.38565 29.8665 3.61188 28.4717 1.1439C28.0862 0.461694 27.3657 0.517386 27.0311 1.22596C23.567 8.56169 6.10641 38.2988 0.600992 45.4879C0.0748938 46.1749 0.383377 47.3996 1.24797 47.4343C7.06659 47.6674 22.6629 46.2257 28.8825 46.1401C31.0533 46.3023 55.0061 46.9526 55.1239 46.7618C55.2382 46.5774 52.7104 42.1426 49.5069 36.9064Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (variation === 2) {
    return (
      <svg className="svg-icon" fill="none" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28.9291 3.02507C29.4231 2.03629 29.9595 1.0775 30.1209 0.894854C30.7001 0.239463 31.0025 0.501278 32.0526 2.56656C32.613 3.66868 33.8814 5.74061 34.8712 7.17062C37.313 10.6984 38.8453 13.1307 41.1742 17.1752C47.574 28.2907 47.9055 28.8336 56.1624 41.7235C61.1043 49.4384 61.3714 48.8119 53.1482 48.7923C49.8577 48.7843 46.0971 48.8713 44.7912 48.9856C41.9429 49.2347 12.4185 49.3668 6.31986 49.1578C-0.292745 48.9311 -1.05669 48.2643 1.62604 45.0603C3.78966 42.4761 6.74113 38.4015 9.62368 34.0191C11.1542 31.6921 13.9768 27.4203 15.8961 24.5261C22.6099 14.4018 26.2219 8.44286 28.9291 3.02507Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg className="svg-icon" fill="none" viewBox="0 0 58 50" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.953134 48.1534C-1.23843 45.9628 19.0784 12.0654 28.858 1.59601C30.3792 -0.0326284 30.1366 -0.228354 33.0147 4.95067C35.2349 8.94541 39.2027 15.6542 43.6518 22.935C44.8068 24.8254 46.8555 28.2626 48.2044 30.5731C49.5531 32.8836 51.989 37.0082 53.6174 39.7389C57.6326 46.4724 58.0104 47.2086 57.641 47.578C57.0895 48.1293 55.2167 48.2513 44.7697 48.4175C38.9909 48.5093 33.661 48.6363 32.9255 48.6999C28.2367 49.1051 10.6069 49.4286 7.33889 49.1694C3.74169 48.8844 1.2949 48.495 0.953134 48.1534Z"
        fill="currentColor"
      />
    </svg>
  );
}
