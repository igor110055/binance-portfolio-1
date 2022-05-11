import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dropdown,
  FormControl,
  FormControlProps,
  Spinner,
} from "react-bootstrap";
import { usePrices } from "../../contexts/Prices/usePrices";
import { AssetIcon } from "./AssetIcon";

function useCombinedRefs<T>(
  ...refs: (ForwardedRef<T> | MutableRefObject<T>)[]
) {
  const targetRef = useRef<T>(null);
  useEffect(() => {
    refs.forEach((ref) => {
      if (ref === null) return null;
      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);
  return targetRef;
}

const AssetDropdownToggle = forwardRef<
  HTMLInputElement,
  FormControlProps & {
    search: string;
    show: boolean;
    setSearch: Dispatch<SetStateAction<string>>;
    setShow: Dispatch<SetStateAction<boolean>>;
  }
>(({ children, search, show, setSearch, setShow, ...props }, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);

  useEffect(() => {
    if (combinedRef && !show) {
      combinedRef.current?.blur();
    }
  }, [combinedRef, show]);

  return (
    <FormControl
      ref={combinedRef}
      className="mx-3 my-2 w-auto"
      placeholder="Add asset"
      size="sm"
      onChange={(e) => {
        return setSearch(e.target.value.toUpperCase());
      }}
      value={search}
      onFocus={() => setShow(true)}
      onBlur={() => setTimeout(() => setShow(false), 10)}
      {...props}
    />
  );
});

export function AssetDropdown({
  onSelect,
}: {
  onSelect: (assetId: string | null) => void;
}) {
  const [prices, loading] = usePrices();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState<boolean>(false);
  if (loading) {
    return <Spinner animation="grow" size="sm" />;
  }
  const assetIds = Object.keys(prices)
    .filter((assetId) => {
      return !search || assetId.startsWith(search);
    })
    .sort((a, b) => {
      return a.localeCompare(b);
    });
  return (
    <Dropdown
      show={show}
      onSelect={(eventKey) => {
        onSelect(eventKey);
        setSearch("");
        setShow(false);
      }}
    >
      <Dropdown.Toggle
        as={AssetDropdownToggle}
        search={search}
        show={show}
        setSearch={setSearch}
        setShow={setShow}
      />
      <Dropdown.Menu show={show}>
        {assetIds.map((assetId) => {
          return (
            <Dropdown.Item key={assetId} eventKey={assetId}>
              <AssetIcon assetId={assetId} className="me-2" />
              {assetId}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
