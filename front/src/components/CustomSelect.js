import React, { useState, useRef, useEffect } from 'react';
import './customSelect.css';

export default function CustomSelect({ options = [], value, onChange, placeholder = 'Select...' }) {
    // State to track if the dropdown is open
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleDoc);
        return () => document.removeEventListener('mousedown', handleDoc);
    }, []);
    // Find the selected option based on the value prop
    const selected = options.find((o) => o.value === value);

    return (
        <div className={`custom-select${open ? ' open' : ''}`} ref={ref}>
            <button
                type="button"
                className="custom-select-control"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
            >
                <span className="custom-select-label">{selected ? selected.label : placeholder}</span>
                <span className="custom-select-caret">{open ? '▲' : '▾'}</span>
            </button>

            {/* Options are rendered in normal flow so opening pushes content */}
            <ul className="custom-select-options" role="listbox" style={{ display: open ? 'block' : 'none' }}>
                {options.map((o) => (
                    <li
                        key={o.value}
                        role="option"
                        aria-selected={value === o.value}
                        className={`custom-select-option${value === o.value ? ' selected' : ''}`}
                        onClick={() => {
                            onChange(o.value);
                            setOpen(false);
                        }}
                    >
                        {o.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
