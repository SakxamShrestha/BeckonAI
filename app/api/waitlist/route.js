import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email, businessType } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Send email notification — only if Gmail credentials are configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        })
        await transporter.sendMail({
          from: `"Beckon Waitlist" <${process.env.GMAIL_USER}>`,
          to: 'sakxamshrestha57@gmail.com',
          subject: `New Waitlist Signup – ${businessType || 'Business type not specified'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
              <div style="background: #FFE500; width: 40px; height: 40px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <span style="font-weight: 800; font-size: 18px; color: #0A0A0A;">B</span>
              </div>
              <h2 style="margin: 0 0 8px; font-size: 20px; color: #1A1A1A;">New Waitlist Signup</h2>
              <p style="margin: 0 0 24px; color: #666; font-size: 14px;">Someone just joined the Beckon waitlist.</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 16px; background: #fff; border: 1px solid #eee; border-radius: 8px 8px 0 0; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                  <td style="padding: 12px 16px; background: #fff; border: 1px solid #eee; font-size: 15px; color: #1A1A1A; font-weight: 600;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background: #fff; border: 1px solid #eee; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Business Type</td>
                  <td style="padding: 12px 16px; background: #fff; border: 1px solid #eee; font-size: 15px; color: #1A1A1A; font-weight: 600;">${businessType || 'Not specified'}</td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 12px; color: #aaa;">Signed up on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('[waitlist] Email send failed:', emailErr.message)
      }
    } else {
      console.warn('[waitlist] Gmail credentials not configured — skipping email')
    }

    // Save to DB — best effort, don't fail the request if this errors
    try {
      await prisma.waitlistEntry.upsert({
        where: { email },
        update: { businessType },
        create: { email, businessType },
      })
    } catch (dbErr) {
      console.error('[waitlist] DB save failed:', dbErr.message)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[waitlist] Error:', err.message)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
