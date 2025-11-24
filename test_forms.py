#!/usr/bin/env python3
"""
Anderson Cleaning Form Testing Script
Tests quote form submission and verifies end-to-end functionality
"""

import requests
import json
import time
from datetime import datetime

# Configuration
PRODUCTION_URL = "https://andersoncleaning.com"
LOCAL_URL = "http://localhost:3000"
TEST_EMAIL = "test@andersoncleaning.com"  # Change this to your email

def test_quote_form(base_url=PRODUCTION_URL, test_email=TEST_EMAIL):
    """
    Test the main quote form submission
    """
    print(f"\n{'='*60}")
    print(f"Testing Quote Form: {base_url}/api/quote")
    print(f"{'='*60}\n")

    # Prepare test data
    test_data = {
        "fullName": "Claude Test User",
        "company": "Anderson Test Company",
        "email": test_email,
        "phone": "(413) 555-0123",
        "facilityType": "office",
        "squareFootage": "10000",
        "numRestrooms": "5",
        "numFloors": "2",
        "address": "123 Test Street, Springfield, MA 01089",
        "services": ["daily-cleaning", "floor-care"],
        "cleaningFrequency": "weekly",
        "specialRequirements": "This is a test submission from automated testing script",
        "startDate": "2025-12-01",
        "currentProvider": "none",
        "budgetRange": "$1000-2500",
        "howHeard": "web-search",
        "additionalNotes": f"Automated test at {datetime.now().isoformat()}",
        "website": ""  # Honeypot field - should be empty
    }

    # Submit form
    try:
        print("📤 Submitting form data...")
        response = requests.post(
            f"{base_url}/api/quote",
            json=test_data,
            headers={
                "Content-Type": "application/json",
                "User-Agent": "Anderson-Cleaning-Test-Script/1.0"
            },
            timeout=30
        )

        print(f"Response Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")

        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ SUCCESS: {result}")
            print(f"\n📧 Check email at: {test_email}")
            print(f"📊 Check Supabase for new record")
            return True
        else:
            print(f"\n❌ FAILED: {response.status_code}")
            print(f"Response: {response.text}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"\n❌ ERROR: {e}")
        return False


def test_contact_form(base_url=PRODUCTION_URL, test_email=TEST_EMAIL):
    """
    Test the contact form submission
    """
    print(f"\n{'='*60}")
    print(f"Testing Contact Form: {base_url}/api/contact")
    print(f"{'='*60}\n")

    test_data = {
        "name": "Claude Test User",
        "email": test_email,
        "phone": "(413) 555-0123",
        "company": "Test Company",
        "message": f"This is a test message from automated testing script at {datetime.now().isoformat()}",
        "website": ""  # Honeypot
    }

    try:
        print("📤 Submitting contact form...")
        response = requests.post(
            f"{base_url}/api/contact",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )

        print(f"Response Status: {response.status_code}")

        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ SUCCESS: {result}")
            return True
        else:
            print(f"\n❌ FAILED: {response.status_code}")
            print(f"Response: {response.text}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"\n❌ ERROR: {e}")
        return False


def test_quick_quote(base_url=PRODUCTION_URL, test_email=TEST_EMAIL):
    """
    Test the quick quote form submission
    """
    print(f"\n{'='*60}")
    print(f"Testing Quick Quote Form: {base_url}/api/quick-quote")
    print(f"{'='*60}\n")

    test_data = {
        "name": "Claude Quick Test",
        "email": test_email,
        "phone": "(413) 555-0123",
        "facilityType": "healthcare",
        "website": ""  # Honeypot
    }

    try:
        print("📤 Submitting quick quote...")
        response = requests.post(
            f"{base_url}/api/quick-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )

        print(f"Response Status: {response.status_code}")

        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ SUCCESS: {result}")
            return True
        else:
            print(f"\n❌ FAILED: {response.status_code}")
            print(f"Response: {response.text}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"\n❌ ERROR: {e}")
        return False


def verify_supabase_connection():
    """
    Provide instructions for Supabase verification
    """
    print(f"\n{'='*60}")
    print("SUPABASE VERIFICATION INSTRUCTIONS")
    print(f"{'='*60}\n")

    print("1. Open Supabase Dashboard:")
    print("   https://supabase.com/dashboard/project/tpcunhpbrxpfzxzwrzwz/editor")
    print("\n2. Check these tables for new records:")
    print("   - quote_requests (main quote form)")
    print("   - contact_submissions (contact form)")
    print("   - quote_requests_mini (quick quote)")
    print("\n3. Verify fields:")
    print("   - Name: Claude Test User")
    print("   - Email: test@andersoncleaning.com")
    print("   - Company: Anderson Test Company / Test Company")
    print("   - created_at: Should be within last few minutes")
    print("\n4. Check for test identifier:")
    print("   - Look for: 'automated testing script' in notes/message fields")


def main():
    """
    Main test execution
    """
    print("\n" + "="*60)
    print("ANDERSON CLEANING - FORM END-TO-END TESTING")
    print("="*60)

    # Get test configuration
    print("\nTest Configuration:")
    print(f"  Production URL: {PRODUCTION_URL}")
    print(f"  Test Email: {TEST_EMAIL}")
    print("\nIMPORTANT: Change TEST_EMAIL variable to your email address!")

    response = input("\nProceed with testing? (yes/no): ")
    if response.lower() != 'yes':
        print("Testing cancelled.")
        return

    # Choose test environment
    env = input("\nTest environment (production/local): ").lower()
    base_url = LOCAL_URL if env == 'local' else PRODUCTION_URL

    # Run tests
    results = {
        "quote_form": False,
        "contact_form": False,
        "quick_quote": False
    }

    print(f"\n🚀 Testing against: {base_url}")
    time.sleep(2)

    # Test each form
    results["quote_form"] = test_quote_form(base_url, TEST_EMAIL)
    time.sleep(3)

    results["contact_form"] = test_contact_form(base_url, TEST_EMAIL)
    time.sleep(3)

    results["quick_quote"] = test_quick_quote(base_url, TEST_EMAIL)

    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}\n")

    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")

    total = len(results)
    passed = sum(results.values())
    print(f"\nOverall: {passed}/{total} tests passed ({int(passed/total*100)}%)")

    # Verification instructions
    if any(results.values()):
        verify_supabase_connection()

        print(f"\n{'='*60}")
        print("EMAIL VERIFICATION INSTRUCTIONS")
        print(f"{'='*60}\n")
        print(f"1. Check your inbox: {TEST_EMAIL}")
        print("2. Look for emails from: anderson-cleaning-site.vercel.app")
        print("3. Expected emails:")
        print("   - Quote Request Confirmation")
        print("   - Contact Form Confirmation")
        print("   - Quick Quote Confirmation")
        print("\n4. Check spam folder if not in inbox")
        print("\n5. Verify email content includes test data")


if __name__ == "__main__":
    main()
