import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Span} from "@/components/ui/span";
import {FormCheckboxGroupProps, FormContextType, FormRowLabelProps, FormRowProps} from "@/types";
import {useId} from "react";

// ============================================================================
// Shared Base Types
// ============================================================================

const FormContext = React.createContext<FormContextType | null>(null)

const useFormContext = () => {
    const context = React.useContext(FormContext)
    if (!context) {
        throw new Error("Form compound components must be wrapped inside a <FormRow />")
    }
    return context
}

// ============================================================================
// 1. FormRow Definition
// ============================================================================

// Destructured straight via an implicit type variable assignment
const FormRow = ({ id, error, className, children }: FormRowProps) => {
    const inputId = id || useId()

    return (
        <FormContext.Provider value={{ id: inputId, error }}>
            <div className={cn("grid gap-2 md:flex md:items-start pt-2", className)}>
                {children}
            </div>
        </FormContext.Provider>
    )
}

// ============================================================================
// 2. Sub-Component: FormRow.Label
// ============================================================================


// Reusable arrow configuration referencing its explicit Type assignment
const FormRowLabel: React.FC<FormRowLabelProps> = ({ className, children }) => {
    const { id } = useFormContext()
    return (
        <div className="md:w-1/3 md:pt-2">
            <Label htmlFor={`${id}-input`} className={cn("text-sm font-medium", className)}>
                {children}
            </Label>
        </div>
    )
}
FormRow.Label = FormRowLabel
FormRow.Label.displayName = "FormRow.Label"

// ============================================================================
// 3. Sub-Component: FormRow.Input
// ============================================================================

type FormRowInputProps = React.ComponentPropsWithoutRef<"input">

const FormRowInput = React.forwardRef<HTMLInputElement, FormRowInputProps>(
    ({ className, ...props }, ref) => {
        const { id, error } = useFormContext()
        const errorId = `${id}-error`

        return (
            <div className="md:w-2/3 flex flex-col gap-1.5">
                <Input
                    id={`${id}-input`}
                    ref={ref}
                    className={cn("w-full", error && "border-destructive focus-visible:ring-destructive/50", className)}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    {...props}
                />
                {error && (
                    <Span id={errorId} className="h-auto border-0 bg-transparent p-0 shadow-none text-xs font-medium text-destructive selection:bg-transparent pointer-events-none animate-in fade-in-50 duration-200">
                        {error}
                    </Span>
                )}
            </div>
        )
    }
)
FormRow.Input = FormRowInput
FormRow.Input.displayName = "FormRow.Input"

// ============================================================================
// 4. Sub-Component: FormRow.CheckboxGroup
// ============================================================================

// Assigned using a functional component typing signature variable
const FormRowCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
                                                                    options,
                                                                    selectedValues,
                                                                    onChange,
                                                                    gridClassName,
                                                                }) => {
    const { id, error } = useFormContext()
    const errorId = `${id}-error`

    return (
        <div className="md:w-2/3 flex flex-col gap-2">
            <div className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-3", gridClassName)}>
                {options.map((option) => {
                    const isChecked = selectedValues.includes(option.id)
                    const uniqueId = `checkbox-${id}-${option.id}`

                    return (
                        <label
                            key={option.id}
                            htmlFor={uniqueId}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                id={uniqueId}
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => onChange(option, e)}
                                className={cn(
                                    "h-4 w-4 rounded border-input text-primary focus:ring-ring transition-colors",
                                    error && "border-destructive focus:ring-destructive/50"
                                )}
                                aria-invalid={!!error}
                            />
                            <Span
                                className={cn(
                                    "h-auto border-0 bg-transparent p-0 shadow-none text-sm font-normal selection:bg-transparent transition-colors",
                                    isChecked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground",
                                    error && "text-destructive/90"
                                )}
                            >
                                {option.name}
                            </Span>
                        </label>
                    )
                })}
            </div>

            {error && (
                <Span id={errorId} className="h-auto border-0 bg-transparent p-0 shadow-none text-xs font-medium text-destructive selection:bg-transparent pointer-events-none animate-in fade-in-50 duration-200">
                    {error}
                </Span>
            )}
        </div>
    )
}
FormRow.CheckboxGroup = FormRowCheckboxGroup
FormRow.CheckboxGroup.displayName = "FormRow.CheckboxGroup"

export {FormRow};
