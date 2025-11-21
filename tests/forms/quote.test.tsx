import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuoteFormInline from '@/components/forms/QuoteFormInline'
import { submitQuickQuoteRequest } from '@/lib/forms/quickQuoteClient'

jest.mock('@/lib/forms/quickQuoteClient', () => ({
  submitQuickQuoteRequest: jest.fn(),
}))

const mockedSubmitQuickQuote = submitQuickQuoteRequest as jest.Mock

const fillField = async (labelRegex: RegExp, value: string, user = userEvent.setup()) => {
  const input = screen.getByLabelText(labelRegex)
  await user.clear(input)
  await user.type(input, value)
}

describe('QuoteFormInline', () => {
  beforeEach(() => {
    mockedSubmitQuickQuote.mockReset()
  })

  it('displays validation messages when submitting empty form', async () => {
    render(<QuoteFormInline />)
    const user = userEvent.setup()
    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    await user.click(submitButton)

    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter a valid business email address/i)).toBeInTheDocument()
  })

  it('submits successfully with valid fields', async () => {
    mockedSubmitQuickQuote.mockResolvedValue({ success: true })
    const onSubmitSuccess = jest.fn()
    render(<QuoteFormInline onSubmitSuccess={onSubmitSuccess} />)
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    await fillField(/full name/i, 'Ada Lovelace', user)
    await fillField(/business email/i, 'ada@example.com', user)
    await fillField(/phone number/i, '5551234567', user)

    const facilitySelect = screen.getByLabelText(/facility type/i)
    await user.selectOptions(facilitySelect, 'office')

    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    await user.click(submitButton)

    await act(async () => {
      await Promise.resolve()
    })

    expect(await screen.findByText(/thank you for your request/i)).toBeInTheDocument()

    await act(async () => {
      jest.advanceTimersByTime(3000)
    })

    expect(onSubmitSuccess).toHaveBeenCalled()
  })

  it('shows an error message when submission fails', async () => {
    mockedSubmitQuickQuote.mockRejectedValue(new Error('Network error'))
    render(<QuoteFormInline />)
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    await fillField(/full name/i, 'Ada Lovelace', user)
    await fillField(/business email/i, 'ada@example.com', user)
    await fillField(/phone number/i, '5551234567', user)
    const facilitySelect = screen.getByLabelText(/facility type/i)
    await user.selectOptions(facilitySelect, 'office')
    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    await user.click(submitButton)

    await act(async () => {
      await Promise.resolve()
    })

    expect(await screen.findByText(/network error/i)).toBeInTheDocument()
  })
})
