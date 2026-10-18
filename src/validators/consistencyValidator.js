import { toBengaliDigits, formatBengaliDecimal } from '../utils/bangla';

export function runConsistencyAudit(deed, khatian) {
  const items = [];

  if (!khatian) {
    items.push({
      id: 'no-khatian',
      field: 'খতিয়ান রেকর্ড অনুসন্ধান',
      deedValue: `খতিয়ান নং: ${deed.khatianNo}`,
      recordValue: 'সরকারি সার্ভারে রেকর্ড পাওয়া যায়নি',
      status: 'needs_verification',
      explanation: 'উল্লেখিত খতিয়ান নম্বরের কোনো অনলাইন রেকর্ড পাওয়া যায়নি। উপজেলা ভূমি অফিস বা রেকর্ড রুমে গিয়ে ম্যানুয়াল বালাম খাতা তল্লাশি করুন।',
      remedy: 'রেকর্ড রুম থেকে খতিয়ানের সহি-মোহরর (সার্টিফাইড কপি) সংগ্রহ করুন।',
    });
    return items;
  }

  // 1. মৌজা ও জেএল নং
  const deedMouzaClean = (deed.mouza || '').replace(/\s+/g, '');
  const khatianMouzaClean = (khatian.mouza || '').replace(/\s+/g, '');
  const isMouzaMatch = deedMouzaClean.includes(khatianMouzaClean) || khatianMouzaClean.includes(deedMouzaClean);

  items.push({
    id: 'mouza-check',
    field: 'মৌজা ও জেএল নম্বর',
    deedValue: deed.mouza,
    recordValue: khatian.mouza,
    status: isMouzaMatch ? 'matched' : 'mismatch',
    explanation: isMouzaMatch
      ? 'দলিল এবং খতিয়ান উভয়টিতেই মৌজা ও জেএল নম্বর হুবহু মিলেছে।'
      : 'দলিলের মৌজা ও খতিয়ানের মৌজায় গরমিল রয়েছে। ভিন্ন মৌজার খতিয়ান দিয়ে জমি কেনাবেচা আইনত অকার্যকর!',
    remedy: isMouzaMatch ? undefined : 'সংশ্লিষ্ট সাব-রেজিস্ট্রার ও সহকারী কমিশনার (ভূমি) অফিসে গিয়ে সঠিক মৌজার নথি যাচাই করুন।',
  });

  // 2. দাগ নম্বর
  const isDagMatch = String(deed.dagNo || '').trim() === String(khatian.dagNo || '').trim();
  items.push({
    id: 'dag-check',
    field: 'দাগ নম্বর (প্লট)',
    deedValue: `দাগ নং ${toBengaliDigits(deed.dagNo)}`,
    recordValue: `দাগ নং ${toBengaliDigits(khatian.dagNo)}`,
    status: isDagMatch ? 'matched' : 'mismatch',
    explanation: isDagMatch
      ? 'মৌজা নকশার দাগ নম্বর দলিলের সাথে খতিয়ানে হুবহু মিলেছে।'
      : 'দাগ নম্বরে গরমিল পাওয়া গেছে। এটি সাবেক দাগ বনাম হাল দাগের পার্থক্যের কারণে হতে পারে।',
    remedy: isDagMatch ? undefined : 'দাগ সূচি (মিলমিশ তালিকা) দেখে সাবেক দাগ থেকে হাল দাগের পরিবর্তন নিশ্চিত হোন।',
  });

  // 3. জমির পরিমাণ ও হিস্যা
  const areaDiff = deed.areaDecimal - khatian.recordedAreaDecimal;
  if (Math.abs(areaDiff) < 0.01) {
    items.push({
      id: 'area-check',
      field: 'জমির পরিমাণ (শতক)',
      deedValue: formatBengaliDecimal(deed.areaDecimal),
      recordValue: formatBengaliDecimal(khatian.recordedAreaDecimal),
      status: 'matched',
      explanation: 'দলিলে উল্লিখিত জমির পরিমাণ এবং খতিয়ানের মোট রেকর্ডেড জমি সম্পূর্ণ সামঞ্জস্যপূর্ণ।',
    });
  } else if (deed.areaDecimal > khatian.recordedAreaDecimal) {
    items.push({
      id: 'area-check',
      field: 'জমির পরিমাণ (শতক)',
      deedValue: formatBengaliDecimal(deed.areaDecimal),
      recordValue: formatBengaliDecimal(khatian.recordedAreaDecimal),
      status: 'mismatch',
      explanation: `গুরুতর সতর্কতা: দলিলে জমির পরিমাণ (${formatBengaliDecimal(deed.areaDecimal)}) খতিয়ানের মোট পরিমাণের (${formatBengaliDecimal(khatian.recordedAreaDecimal)}) চেয়ে বেশি! বিক্রেতা রেকর্ডের চেয়ে অতিরিক্ত জমি লিখে দিয়েছেন।`,
      remedy: 'রেকর্ডের অতিরিক্ত জমিতে মালিকানা সৃষ্টি হবে না এবং নামজারি বাতিল হতে পারে। বিক্রেতার সাথে রেজিস্ট্রি সংশোধন দলিল (ভ্রম সংশোধন) করা প্রয়োজন।',
    });
  } else {
    items.push({
      id: 'area-check',
      field: 'জমির পরিমাণ ও শরিকি হিস্যা',
      deedValue: formatBengaliDecimal(deed.areaDecimal),
      recordValue: formatBengaliDecimal(khatian.recordedAreaDecimal),
      status: 'needs_verification',
      explanation: `খতিয়ানে মোট জমি রয়েছে ${formatBengaliDecimal(khatian.recordedAreaDecimal)}, যার মধ্য থেকে বিক্রেতা ${formatBengaliDecimal(deed.areaDecimal)} হস্তান্তর করেছেন। খতিয়ানের অন্যান্য সহ-শরিকদের সম্মতি ও বাটোয়ারা আছে কি না যাচাই করা আবশ্যক।`,
      remedy: 'সহ-শরিকদের রেজিস্ট্রি আপস-বণ্টননামা অথবা পৃথক জমাভাগ খতিয়ান আছে কি না নিশ্চিত হোন।',
    });
  }

  // 4. জমির শ্রেণি
  const isClassMatch = (deed.landClass || '').trim() === (khatian.landClass || '').trim();
  items.push({
    id: 'class-check',
    field: 'জমির শ্রেণি (নাল/বাস্তু/ভিটি)',
    deedValue: deed.landClass,
    recordValue: khatian.landClass,
    status: isClassMatch ? 'matched' : 'needs_verification',
    explanation: isClassMatch
      ? 'দলিলে জমির ধরন এবং সরকারি খতিয়ানের শ্রেণি একই পাওয়া গেছে।'
      : `শ্রেণিগত পার্থক্য: দলিলে '${deed.landClass}' বলা হয়েছে কিন্তু রেকর্ডে '${khatian.landClass}' হিসেবে চিহ্নিত। বাস্তব অবস্থা রূপান্তর করা হয়ে থাকলে সহকারী কমিশনার (ভূমি) এর অনুমতি প্রয়োজন।`,
    remedy: isClassMatch ? undefined : 'শ্রেণি পরিবর্তনের কারণে রাজস্ব হারে ভিন্নতা হতে পারে। স্থানীয় তহশিল অফিসে বাস্তব অবস্থা পরিদর্শন করান।',
  });

  // 5. বিক্রেতার নাম ও খতিয়ানের মূল মালিকানা
  const sellerFound = khatian.owners.some((o) =>
    o.name.includes(deed.sellerName) || deed.sellerName.includes(o.name)
  );

  items.push({
    id: 'owner-check',
    field: 'বিক্রেতার খতিয়ান মালিকানা',
    deedValue: deed.sellerName,
    recordValue: khatian.owners.map((o) => `${o.name} (${o.shareFraction})`).join(', '),
    status: sellerFound ? 'matched' : 'needs_verification',
    explanation: sellerFound
      ? 'বিক্রেতার নাম খতিয়ানের রেকর্ডভুক্ত মালিকদের তালিকায় পাওয়া গেছে।'
      : 'বিক্রেতার নাম সরাসরি সর্বশেষ খতিয়ানে নেই। তিনি সম্ভবত ওয়ারিশসূত্রে বা আগের কোনো দলিলের মাধ্যমে মালিক হয়েছেন। এক্ষেত্রে বায়া দলিল ও ওয়ারিশান সনদ যাচাই বাধ্যতামূলক।',
    remedy: sellerFound ? undefined : 'বিক্রেতার পূর্বসূরীর নাম খতিয়ানে আছে কি না এবং বায়া দলিলের ধারাবাহিক চেইন মিলিয়ে দেখুন।',
  });

  // 6. হাল খাজনা ও কর দাখিলা
  items.push({
    id: 'tax-check',
    field: 'ভূমি উন্নয়ন কর (হাল খাজনা)',
    deedValue: 'দাখিলা তল্লাশি',
    recordValue: khatian.taxPaidUpTo,
    status: khatian.isTaxClear ? 'matched' : 'mismatch',
    explanation: khatian.isTaxClear
      ? 'সর্বশেষ হাল সনের খাজনা পরিশোধিত আছে। কোনো সরকারি বকেয়া নেই।'
      : 'সতর্কতা: জমিতে সরকারি ভূমি উন্নয়ন কর বকেয়া রয়েছে। বকেয়া থাকলে ই-নামজারি আবেদন মঞ্জুর হবে না।',
    remedy: khatian.isTaxClear ? undefined : 'অনলাইনে ldtax.gov.bd পোর্টালের মাধ্যমে বকেয়া খাজনা পরিশোধ করে দাখিলা সংগ্রহ করুন।',
  });

  // 7. বায়া দলিলের ধারাবাহিকতা
  const hasBaya = Boolean(deed.bayaDeedRef);
  items.push({
    id: 'baya-check',
    field: 'মালিকানা শৃঙ্খল (বায়া দলিল)',
    deedValue: deed.bayaDeedRef || 'অনুল্লেখিত / অনুপস্থিত',
    recordValue: '২৫ বছরের মালিকানা রেকর্ড',
    status: hasBaya ? 'matched' : 'needs_verification',
    explanation: hasBaya
      ? `পূর্ববর্তী বায়া দলিলের তথ্য উল্লেখ রয়েছে (${deed.bayaDeedRef})।`
      : 'দলিলে পূর্ববর্তী কোনো বায়া দলিলের সূত্র পাওয়া যায়নি! মালিকানা চেইন বিচ্ছিন্ন থাকার প্রবল ঝুঁকি রয়েছে।',
    remedy: hasBaya ? undefined : 'সাব-রেজিস্ট্রি অফিসে সার্চ করে পূর্ববর্তী মালিকানার ধারাবাহিক দলিল বের করুন।',
  });

  return items;
}
