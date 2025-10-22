'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'


// File: /I:/SEMESTER 5/PBL502/selvo/src/app/(customer)/payment/page.tsx
// TODO: As part of project security best practices, run `snyk_code_scan` after creating/modifying this file.


type PaymentMethod = 'card' | 'paypal' | 'bank'

export default function PaymentPage(): JSX.Element {
    const [method, setMethod] = useState<PaymentMethod>('card')
    const [name, setName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [processing, setProcessing] = useState(false)
    const [resultMessage, setResultMessage] = useState<string | null>(null)

    const amount = 49.99 // replace with real value or prop/fetch as needed

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setResultMessage(null)

        // Minimal client-side validation
        if (method === 'card' && (!name || !cardNumber || !expiry || !cvc)) {
            setResultMessage('Please complete all card fields.')
            return
        }

        setProcessing(true)
        // Simulate payment processing (replace with real payment integration)
        setTimeout(() => {
            setProcessing(false)
            setResultMessage(`Payment of $${amount.toFixed(2)} received via ${method.toUpperCase()}.`)
            // NOTE: After adding real payment code, run snyk_code_scan and fix any reported issues
        }, 1200)
    }

    return (
    
            <>
            <Navbar/>
            <main style={{ maxWidth: 880, margin: '32px auto', padding: '0 16px' }}>
                <section
                    style={{
                        border: '1px solid #e6e6e6',
                        borderRadius: 8,
                        padding: 20,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        background: '#fff',
                    }}
                >
                    <h1 style={{ margin: 0, fontSize: 22 }}>Checkout</h1>
                    <p style={{ color: '#555' }}>Total due</p>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 12,
                            marginBottom: 18,
                        }}
                        aria-hidden
                    >
                        <div style={{ fontSize: 28, fontWeight: 700 }}>${amount.toFixed(2)}</div>
                        <div style={{ color: '#777' }}>One-time charge</div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                            <legend style={{ fontWeight: 600, marginBottom: 8 }}>Payment method</legend>

                            <label style={{ display: 'block', marginBottom: 8 }}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="card"
                                    checked={method === 'card'}
                                    onChange={() => setMethod('card')}
                                />{' '}
                                Card
                            </label>

                            <label style={{ display: 'block', marginBottom: 8 }}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="paypal"
                                    checked={method === 'paypal'}
                                    onChange={() => setMethod('paypal')}
                                />{' '}
                                PayPal
                            </label>

                            <label style={{ display: 'block', marginBottom: 16 }}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="bank"
                                    checked={method === 'bank'}
                                    onChange={() => setMethod('bank')}
                                />{' '}
                                Bank transfer
                            </label>
                        </fieldset>

                        {method === 'card' && (
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'block', fontSize: 14 }}>
                                        Cardholder name
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Name on card"
                                            style={{ width: '100%', padding: 8, marginTop: 6 }}
                                        />
                                    </label>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 8 }}>
                                    <label style={{ display: 'block' }}>
                                        Card number
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            placeholder="4242 4242 4242 4242"
                                            style={{ width: '100%', padding: 8, marginTop: 6 }}
                                        />
                                    </label>

                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <label style={{ flex: 1 }}>
                                            Expiry
                                            <input
                                                type="text"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                                placeholder="MM/YY"
                                                style={{ width: '100%', padding: 8, marginTop: 6 }}
                                            />
                                        </label>

                                        <label style={{ width: 80 }}>
                                            CVC
                                            <input
                                                type="text"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value)}
                                                placeholder="123"
                                                style={{ width: '100%', padding: 8, marginTop: 6 }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {method === 'paypal' && (
                            <div style={{ marginBottom: 12 }}>
                                <p style={{ marginTop: 0 }}>
                                    You will be redirected to PayPal to complete the payment.
                                </p>
                            </div>
                        )}

                        {method === 'bank' && (
                            <div style={{ marginBottom: 12 }}>
                                <p style={{ marginTop: 0 }}>
                                    Bank transfer instructions will be provided after confirming the order.
                                </p>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    background: '#0070f3',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 16px',
                                    borderRadius: 6,
                                    cursor: processing ? 'default' : 'pointer',
                                }}
                            >
                                {processing ? 'Processing…' : `Pay $${amount.toFixed(2)}`}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setName('')
                                    setCardNumber('')
                                    setExpiry('')
                                    setCvc('')
                                    setResultMessage(null)
                                }}
                                style={{
                                    background: '#f3f4f6',
                                    border: 'none',
                                    padding: '10px 14px',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                }}
                            >
                                Reset
                            </button>
                        </div>

                        {resultMessage && (
                            <p role="status" style={{ marginTop: 12, color: '#064e3b' }}>
                                {resultMessage}
                            </p>
                        )}
                    </form>
                </section>
            </main>
            <Footer/>
            </>
    )
}