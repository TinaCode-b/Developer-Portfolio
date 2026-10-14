// A labelled input or textarea with an accessible error message.
export default function FormField({
  label,
  name,
  type = 'text',
  multiline = false,
  value,
  error,
  onChange,
  onBlur,
  inputRef,
  autoComplete,
  hint,
}) {
  const id = `field-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className="field">
      <label htmlFor={id}>
        {label} <span className="field__required">(required)</span>
      </label>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      <Control
        id={id}
        name={name}
        ref={inputRef}
        type={multiline ? undefined : type}
        rows={multiline ? 6 : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required
        aria-required="true"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
      />
      <p id={errorId} className="field__error">
        {error}
      </p>
    </div>
  );
}
