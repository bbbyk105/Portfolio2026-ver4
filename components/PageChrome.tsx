import GlobalNav from "@/components/GlobalNav";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * What every page shares outside its document: smoothing, the navigation,
 * and the column rails running the full height under the content.
 */
export default function PageChrome() {
  return (
    <>
      <SmoothScroll />
      <GlobalNav />
      <div className="rails" aria-hidden="true">
        <span />
        <span />
      </div>
    </>
  );
}
