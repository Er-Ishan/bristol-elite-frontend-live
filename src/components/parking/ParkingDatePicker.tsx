import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/parking-datepicker.css";
import { useIsMobile } from "../../hooks/useIsMobile";
import { formatDateForInput } from "../../utils/parkingSearch";

interface ParkingDatePickerProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    minDate?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    id?: string;
    /** Use calendar picker below this width (default 767). Pricing uses 991. */
    mobileBreakpoint?: number;
}

function parseYmd(value: string): Date | null {
    if (!value) return null;
    const d = new Date(`${value}T12:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
}

const MobileReadOnlyInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { onClick?: () => void }
>(function MobileReadOnlyInput({ onClick, onFocus, ...rest }, ref) {
    return (
        <input
            {...rest}
            ref={ref}
            readOnly
            inputMode="none"
            autoComplete="off"
            onClick={onClick}
            onFocus={(e) => {
                onFocus?.(e);
                onClick?.();
            }}
            onKeyDown={(e) => e.preventDefault()}
        />
    );
});

/** Native date on desktop; calendar-only (no keyboard / Set button) on mobile. */
const ParkingDatePicker: React.FC<ParkingDatePickerProps> = ({
    name,
    value,
    onChange,
    minDate,
    placeholder,
    required,
    id,
    mobileBreakpoint = 767,
}) => {
    const isMobile = useIsMobile(mobileBreakpoint);

    if (!isMobile) {
        return (
            <input
                type="date"
                id={id}
                name={name}
                value={value}
                min={minDate}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            />
        );
    }

    const selected = parseYmd(value);
    const min = minDate ? parseYmd(minDate) : parseYmd(formatDateForInput(new Date()));

    return (
        <DatePicker
            id={id}
            name={name}
            selected={selected}
            onChange={(date: Date | null) => {
                if (!date) return;
                onChange(formatDateForInput(date));
            }}
            minDate={min ?? new Date()}
            dateFormat="dd/MM/yyyy"
            wrapperClassName="w-100 parking-date-picker"
            shouldCloseOnSelect
            // readOnly
            withPortal
            customInput={<MobileReadOnlyInput name={name} required={required} />}
            placeholderText={placeholder}
            required={required}
            showPopperArrow={false}
            popperPlacement="bottom-start"
        />
    );
};

export default ParkingDatePicker;
