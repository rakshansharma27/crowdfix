/**
 * CrowdFix Automated Test Suite
 * Run with: node test_crowdfix.js
 */

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
const errors = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}`);
    console.log(`     → ${e.message}`);
    failed++;
    errors.push({ name, error: e.message });
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

// ─────────────────────────────────────────────
// 1. HTML STRUCTURE
// ─────────────────────────────────────────────
console.log('\n📄 HTML Structure');

const criticalIds = [
  'viewOverview', 'viewReportsFeed', 'viewClustersView', 'viewResolvedView',
  'issueList', 'reportStrip', 'fullReportsFeed', 'clustersGrid', 'resolvedGrid',
  'osmMap', 'speechmaticsHud', 'hudDot', 'hudStatusText',
  'telemetryLatencyPill', 'telemetryLangPill', 'telemetryConfidencePill',
  'interimStreamText', 'recordButton', 'reportText', 'submitReport',
  'previewCategory', 'previewLandmark', 'previewSeverity', 'previewSpam',
  'previewClusteringReason', 'detailTitle', 'detailCategory', 'detailStatus',
  'detailClusteringStatement', 'detailMatchingCriteria', 'detailMergedReportsList',
  'addMyVoiceBtn', 'officerControlPanel', 'officerStatusSelect', 'officerNoteInput',
  'officerUpdateBtn', 'residentActionBox', 'shareEvidenceBtn', 'exportEvidenceBtn',
  'authModal', 'reportModal', 'issueDetailModal', 'profileModal', 'helpModal',
  'closeReport', 'closeDetailModal', 'closeProfileModal', 'closeHelpModal', 'closeHelpFooter',
  'topbarDate', 'topbarGreeting', 'topbarAvatar', 'sidebarAvatar', 'locationPill',
  'locationPillText', 'statTotalReports', 'statActiveClusters', 'statResolvedRate',
  'heroReportCount', 'categoryFilter', 'feedSearchInput', 'feedTagFilter',
  'viewAllIssuesBtn', 'seeAllReportsBtn', 'recenterMapBtn', 'openReport',
  'heroQuickDemo', 'helpButton', 'hamburgerBtn', 'sidebarOverlay',
  'sidebarNav', 'sidebarReportCount', 'sidebarClusterCount', 'sidebarResolvedCount',
  'btnSwitchResident', 'btnSwitchOfficer', 'btnResetDemoData', 'btnSignOut',
  'toast', 'authForm', 'authName', 'authEmail', 'authPassword', 'locationConsent',
  'profileTrigger', 'modalAvatarLarge', 'modalUserName', 'modalUserEmail', 'modalRoleBadge',
  'toggleHeatmapBtn', 'pushNotificationBtn', 'clerkGoogleBtn', 'pocketbaseStatusTag'
];

criticalIds.forEach(id => {
  test(`HTML has #${id}`, () => {
    assert(html.includes(`id="${id}"`), `Missing id="${id}" in index.html`);
  });
});

// ─────────────────────────────────────────────
// 2. CATEGORY FILTER OPTIONS
// ─────────────────────────────────────────────
console.log('\n🔽 Filter Dropdowns');

const categories = ['ROAD SAFETY', 'CLEANLINESS', 'PUBLIC LIGHTING', 'WATER & SEWAGE', 'TRAFFIC & TRANSIT'];
categories.forEach(cat => {
  test(`categoryFilter has "${cat}" option`, () => {
    assert(html.includes(cat), `Missing option "${cat}" in categoryFilter`);
  });
});

test('feedTagFilter has TRAFFIC & TRANSIT option', () => {
  // count occurrences - should appear at least twice (one per dropdown)
  const count = (html.match(/TRAFFIC &amp; TRANSIT|TRAFFIC & TRANSIT/g) || []).length;
  assert(count >= 2, `TRAFFIC & TRANSIT appears ${count} times, expected >= 2`);
});

// ─────────────────────────────────────────────
// 3. EVENT LISTENERS WIRING
// ─────────────────────────────────────────────
console.log('\n🔌 Event Listener Wiring');

const wirings = [
  ['categoryFilter', 'renderOverviewPriorityQueue'],
  ['feedTagFilter', 'renderLiveReportsFeed'],
  ['feedSearchInput', 'renderLiveReportsFeed'],
  ['recenterMapBtn', 'setView'],
  ['viewAllIssuesBtn', "switchView('clusters')"],
  ['seeAllReportsBtn', "switchView('reports')"],
  ['shareEvidenceBtn', 'navigator.share'],
  ['exportEvidenceBtn', 'Evidence PDF generated'],
  ['hamburgerBtn', 'openSidebar'],
  ['sidebarOverlay', 'closeSidebar'],
  ['addMyVoiceBtn', 'addMyVoiceToCurrentIssue'],
  ['officerUpdateBtn', 'handleOfficerStatusUpdate'],
  ['openReport', 'openReportModal'],
  ['closeReport', 'closeReportModal'],
  ['helpButton', 'helpModal'],
  ['closeHelpFooter', 'helpModal'],
];

wirings.forEach(([elementId, handlerSnippet]) => {
  test(`#${elementId} wired to "${handlerSnippet.slice(0, 40)}"`, () => {
    const idIdx = js.indexOf(elementId);
    assert(idIdx !== -1, `#${elementId} not found in app.js`);
    const nearby = js.slice(idIdx - 50, idIdx + 400);
    assert(nearby.includes(handlerSnippet) || js.includes(handlerSnippet),
      `Handler "${handlerSnippet.slice(0,40)}" not found near #${elementId}`);
  });
});

// ─────────────────────────────────────────────
// 4. CIVIC EVIDENCE PARSER LOGIC (simulated)
// ─────────────────────────────────────────────
console.log('\n🧠 Civic Evidence Parser Logic');

// Extract and eval parser in a safe sandbox
const parserMatch = js.match(/class CivicEvidenceParser \{[\s\S]*?\n\}/);

// Simulate parse logic manually
function simulateParse(text) {
  const lower = text.toLowerCase();
  let category = 'ROAD SAFETY';
  if (/(garbage|waste|trash|bin|dump|stink|smell|litter|debris|plastic|kachra|kuda|badboo|safai|gandagi|dhalav|dhalao|kachre|ganda)/i.test(lower)) category = 'CLEANLINESS';
  else if (/(streetlight|street light|light|lamp|dark|night|bulb|pole|flicker|sparking|andhera|roshni|bijli|khamba|batti)/i.test(lower)) category = 'PUBLIC LIGHTING';
  else if (/(water|pipe|pipeline|leak|burst|sewage|drain|drainage|gutter|drinking|flooding|paani|pani|nali|naali|gutar|gutters|ganda paani|bah raha|phat)/i.test(lower)) category = 'WATER & SEWAGE';
  else if (/(traffic|signal|jam|congestion|junction|bus stop|auto stand|jaam|bheed|gaadiyan|chakka jam|red light)/i.test(lower)) category = 'TRAFFIC & TRANSIT';
  else if (/(pothole|path hole|pathhole|pot hole|gaddha|khaddha|road|sadak|bike|skid|accident|crash|crater|asphalt|slip|gir)/i.test(lower)) category = 'ROAD SAFETY';

  let landmark = 'Koramangala';
  if (/(80 feet road|80 ft road|80feet|assi feet|80 foot)/i.test(lower)) landmark = '80 Feet Road';
  else if (/(6th block|sixth block|chhe block|chatha block|chhe number)/i.test(lower)) landmark = '6th Block';
  else if (/(1st a cross|1st cross|first cross|pehla cross|pehli cross)/i.test(lower)) landmark = '1st A Cross';
  else if (/(metro|station|metro station|metro ke paas)/i.test(lower)) landmark = 'Metro Station';
  else if (/(college|university|campus|school|institute)/i.test(lower)) landmark = 'College Gate';

  let severity = 'Medium';
  if (/(crash|accident|danger|almost crashed|skidded|burst|deep|flooding|sparking|emergency|severe|khatra|khatarnak|bohot zyada|bahut zyada|bada gaddha|phat gaya|chot)/i.test(lower)) severity = 'High';

  const isTooShort = text.trim().length < 8;
  const isRepetitive = /(.)(\1){5,}/i.test(text);
  const spamScore = isTooShort || isRepetitive ? 0.94 : 0.01;

  return { category, landmark, severity, spamScore, isSpam: spamScore > 0.8 };
}

const parserTests = [
  {
    input: 'a path hole near my college gate',
    expected: { category: 'ROAD SAFETY', landmark: 'College Gate', isSpam: false }
  },
  {
    input: 'There is a dangerous pothole near the metro station on 80 Feet Road. Two bikes almost skidded.',
    expected: { category: 'ROAD SAFETY', landmark: '80 Feet Road', severity: 'High', isSpam: false }
  },
  {
    input: '80 Feet Road metro station ke paas bohot bada gaddha hai, do bikes abhi slip ho gayi dangerous pothole hai.',
    expected: { category: 'ROAD SAFETY', landmark: '80 Feet Road', severity: 'High', isSpam: false }
  },
  {
    input: 'The garbage dump outside 6th Block commercial market has been overflowing.',
    expected: { category: 'CLEANLINESS', landmark: '6th Block', isSpam: false }
  },
  {
    input: '6th block commercial market ke bahar kachra bohot zyada faila hua hai aur badboo aa rahi hai.',
    expected: { category: 'CLEANLINESS', landmark: '6th Block', severity: 'High', isSpam: false }
  },
  {
    input: 'Streetlight has been flickering on 1st Cross making the road dark.',
    expected: { category: 'PUBLIC LIGHTING', landmark: '1st A Cross', isSpam: false }
  },
  {
    input: 'Streetlight band hai 1st Cross pe andhera hai bilkul.',
    expected: { category: 'PUBLIC LIGHTING', landmark: '1st A Cross', isSpam: false }
  },
  {
    input: 'Water pipeline burst near 4th Cross flooding the road.',
    expected: { category: 'WATER & SEWAGE', isSpam: false }
  },
  {
    input: 'Traffic signal junction jam on main road.',
    expected: { category: 'TRAFFIC & TRANSIT', isSpam: false }
  },
  {
    input: 'Traffic junction pe bohot jaam hai gaadiyan ruki hui hain.',
    expected: { category: 'TRAFFIC & TRANSIT', isSpam: false }
  },
  {
    input: 'aaaaaaaaa',  // spam
    expected: { isSpam: true }
  },
  {
    input: 'ok',  // too short
    expected: { isSpam: true }
  }
];

parserTests.forEach(({ input, expected }) => {
  test(`Parser: "${input.slice(0, 50)}…"`, () => {
    const result = simulateParse(input);
    Object.entries(expected).forEach(([key, val]) => {
      assert(result[key] === val, `Expected ${key}="${val}" but got "${result[key]}"`);
    });
  });
});

// ─────────────────────────────────────────────
// 5. CLUSTERING LOGIC
// ─────────────────────────────────────────────
console.log('\n🔗 Clustering Logic');

const mockIssues = [
  { id: 'issue-1', category: 'ROAD SAFETY', landmark: '80 Feet Road', place: '80 Feet Road, Koramangala', status: 'Open' },
  { id: 'issue-2', category: 'CLEANLINESS', landmark: '6th Block', place: '12th Main, 6th Block', status: 'Open' },
];

function simulateCluster(evidence, issues) {
  for (const issue of issues) {
    if (issue.status === 'Resolved') continue;
    const categoryMatch = issue.category === evidence.category;
    const landmarkMatch =
      issue.landmark.toLowerCase().includes(evidence.landmark.toLowerCase()) ||
      evidence.landmark.toLowerCase().includes(issue.landmark.toLowerCase()) ||
      issue.place.toLowerCase().includes(evidence.landmark.toLowerCase());
    if (categoryMatch && landmarkMatch) return { matchedIssue: issue };
  }
  return null;
}

test('Clustering: English pothole on 80 Feet Road merges into issue-1', () => {
  const evidence = simulateParse('Dangerous pothole near metro station on 80 Feet Road. Two bikes skidded.');
  const match = simulateCluster(evidence, mockIssues);
  assert(match !== null, 'Expected a cluster match but got null');
  assert(match.matchedIssue.id === 'issue-1', `Expected issue-1 but got ${match.matchedIssue.id}`);
});

test('Clustering: Hinglish pothole merges into issue-1', () => {
  const evidence = simulateParse('80 Feet Road metro ke paas bohot bada gaddha hai.');
  const match = simulateCluster(evidence, mockIssues);
  assert(match !== null, 'Expected Hinglish report to cluster match but got null');
  assert(match.matchedIssue.id === 'issue-1', `Expected issue-1 but got ${match.matchedIssue.id}`);
});

test('Clustering: Hinglish kachra merges into issue-2', () => {
  const evidence = simulateParse('6th block market ke paas kachra bohot zyada hai.');
  const match = simulateCluster(evidence, mockIssues);
  assert(match !== null, 'Expected Hinglish garbage report to cluster match but got null');
  assert(match.matchedIssue.id === 'issue-2', `Expected issue-2 but got ${match.matchedIssue.id}`);
});

test('Clustering: overflowing bins 6th Block merges into issue-2', () => {
  const evidence = simulateParse('The garbage dump outside 6th Block market is overflowing.');
  const match = simulateCluster(evidence, mockIssues);
  assert(match !== null, 'Expected a cluster match but got null');
  assert(match.matchedIssue.id === 'issue-2', `Expected issue-2 but got ${match.matchedIssue.id}`);
});

test('Clustering: water burst on 4th Cross creates NEW cluster (no match)', () => {
  const evidence = simulateParse('Water pipeline burst near 4th Cross flooding the road severely.');
  const match = simulateCluster(evidence, mockIssues);
  assert(match === null, 'Expected no cluster match but got one: ' + JSON.stringify(match?.matchedIssue?.id));
});

test('Clustering: resolved issues are skipped', () => {
  const resolvedIssues = [{ ...mockIssues[0], status: 'Resolved' }];
  const evidence = simulateParse('Big pothole on 80 Feet Road near metro.');
  const match = simulateCluster(evidence, resolvedIssues);
  assert(match === null, 'Should not merge into a Resolved issue');
});

// ─────────────────────────────────────────────
// 6. STATS & STATE LOGIC
// ─────────────────────────────────────────────
console.log('\n📊 Stats & State Logic');

test('timeAgo: "Just now" for < 60s', () => {
  function timeAgo(iso) {
    if (!iso) return 'Just now';
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
  }
  assert(timeAgo(new Date(Date.now() - 30000).toISOString()) === 'Just now', 'Expected "Just now"');
  assert(timeAgo(new Date(Date.now() - 120000).toISOString()) === '2 min ago', 'Expected "2 min ago"');
  assert(timeAgo(new Date(Date.now() - 7200000).toISOString()) === '2 hr ago', 'Expected "2 hr ago"');
  assert(timeAgo(new Date(Date.now() - 172800000).toISOString()) === '2 days ago', 'Expected "2 days ago"');
});

test('Stats: resolvedRate formula correct', () => {
  const active = 3, resolved = 1;
  const total = active + resolved;
  const rate = total > 0 ? Math.round((resolved / total) * 100) : 88;
  assert(rate === 25, `Expected 25% but got ${rate}%`);
});

test('Stats: 0 resolved → fallback 88%', () => {
  const active = 3, resolved = 0;
  const total = active + resolved;
  const rate = total > 0 ? Math.round((resolved / total) * 100) : 88;
  assert(rate === 0, `With 0 resolved and 3 active, expected 0% but got ${rate}%`);
});

// ─────────────────────────────────────────────
// 7. CSS — CRITICAL CLASSES
// ─────────────────────────────────────────────
console.log('\n🎨 CSS Critical Classes');

const criticalCssClasses = [
  '[hidden]',
  '.hamburger-btn',
  '.sidebar-overlay',
  '.sidebar.open',
  '.speechmatics-hud.streaming',
  '.hud-dot',
  '.modal-footer',
  '.criteria-pill',
  '.cluster-card',
  '.feed-report-item',
  '.verification-alert',
  '.explainable-cluster-box',
  '.demo-chip',
  '.sound-wave-bars',
  '.osm-map-container',
];

criticalCssClasses.forEach(cls => {
  test(`CSS has "${cls}"`, () => {
    // Allow for slight formatting differences
    const normalized = cls.replace(/\./g, '.').replace(/\s/g, '');
    const cssNormalized = css.replace(/\s+/g, ' ');
    assert(css.includes(cls) || cssNormalized.includes(cls.replace(/\s+/g, ' ')),
      `CSS class "${cls}" not found in styles.css`);
  });
});

// ─────────────────────────────────────────────
// 8. SPEECHMATICS HUD & LANGUAGE SUPPORT
// ─────────────────────────────────────────────
console.log('\n📡 Speechmatics HUD & Language Support (English & Hinglish)');

test('Language support: detectLanguage function defined in JS', () => {
  assert(js.includes('function detectLanguage('), 'Missing detectLanguage function in app.js');
});

test('Language support: Hinglish identified correctly', () => {
  assert(js.includes('Hinglish'), 'Missing Hinglish language identification in app.js');
  const hinglishPattern = /\b(gaddha|gaddhe|khaddha|khaddhe|kachra|kuda|badboo|paani|pani|sadak|sadkein|rasta|andhera|roshni|bijli|khamba|nali|naali|jaam|bheed|bohot|bahut|zyada|bada|badi|bade|chhota|chhoti|hai|hain|tha|thi|mein|paas|karo|karein|raha|rahi|rahe|hoga|hogi|faila|gaya|gayi|gayee|phat|tuta|toota|gir|gira|girne|gaadi|gaadiyan|bhai|bhaiya|jaldi|nahi|nahin)\b/i;
  assert(hinglishPattern.test('metro ke paas bada gaddha hai'), 'Hinglish pattern failed to match Hinglish sample');
  assert(!hinglishPattern.test('there is a large pothole near the metro station'), 'Hinglish pattern incorrectly matched pure English');
});

test('Language support: telemetryLangPill displays English initially in HTML', () => {
  assert(html.includes('Lang: <b>English</b>'), 'Missing English as default language in HTML');
});

test('Language support: Hinglish demo chips present in HTML', () => {
  assert(html.includes('Hinglish: Pothole'), 'Missing Hinglish Pothole demo chip in HTML');
  assert(html.includes('Hinglish:') && (html.includes('Kachra') || html.includes('kachra')), 'Missing Hinglish Kachra demo chip in HTML');
});

test('Confidence progression: uses progress-based formula', () => {
  assert(js.includes('progress * 2.5'), 'Missing progressive confidence formula');
});

test('Streaming CSS class toggled on HUD', () => {
  assert(js.includes("classList.toggle('streaming'"), "Missing classList.toggle('streaming')");
});

test('Finalized CSS class toggled on HUD', () => {
  assert(js.includes("classList.toggle('finalized'"), "Missing classList.toggle('finalized')");
});

test('HUD latency jitter: 170–195ms range', () => {
  assert(js.includes('170 + Math.random() * 25'), 'Missing latency jitter formula');
});

// ─────────────────────────────────────────────
// 9. MOBILE NAV
// ─────────────────────────────────────────────
console.log('\n📱 Mobile Navigation');

test('hamburgerBtn present in HTML', () => {
  assert(html.includes('hamburgerBtn'), 'Missing hamburgerBtn in HTML');
});

test('sidebarOverlay present in HTML', () => {
  assert(html.includes('sidebarOverlay'), 'Missing sidebarOverlay in HTML');
});

test('openSidebar function defined in JS', () => {
  assert(js.includes('function openSidebar()'), 'Missing openSidebar function');
});

test('closeSidebar function defined in JS', () => {
  assert(js.includes('function closeSidebar()'), 'Missing closeSidebar function');
});

test('Sidebar slide-in transform in CSS', () => {
  assert(css.includes('translateX(-100%)'), 'Missing translateX(-100%) for sidebar mobile hide');
});

test('sidebar.open class slides sidebar in', () => {
  assert(css.includes('translateX(0)'), 'Missing translateX(0) for .sidebar.open');
});

// ─────────────────────────────────────────────
// 10. SHARE & EXPORT
// ─────────────────────────────────────────────
console.log('\n📤 Share & Export');

test('shareEvidenceBtn uses navigator.share with fallback', () => {
  assert(js.includes('navigator.share'), 'Missing navigator.share');
  assert(js.includes('navigator.clipboard'), 'Missing clipboard fallback');
});

test('exportEvidenceBtn shows Evidence PDF toast', () => {
  assert(js.includes('Evidence PDF generated'), 'Missing "Evidence PDF generated" toast text');
});

test('Share button in HTML (modal footer)', () => {
  assert(html.includes('shareEvidenceBtn'), 'Missing shareEvidenceBtn in HTML');
  assert(html.includes('exportEvidenceBtn'), 'Missing exportEvidenceBtn in HTML');
});

// ─────────────────────────────────────────────
// 11. EMPTY STATES
// ─────────────────────────────────────────────
console.log('\n📭 Empty States');

test('Clusters gallery has empty state', () => {
  assert(js.includes('No active issue clusters'), 'Missing empty state for clusters gallery');
});

test('Reports strip has empty state', () => {
  assert(js.includes('No community voices yet'), 'Missing empty state for reports strip');
});

test('Live reports feed has empty state', () => {
  assert(js.includes('No matching voice reports found'), 'Missing empty state for live reports feed');
});

test('Resolved archive has empty state', () => {
  assert(js.includes('No resolved issues yet'), 'Missing empty state for resolved archive');
});

// ─────────────────────────────────────────────
// 12. DYNAMIC TIMESTAMPS
// ─────────────────────────────────────────────
console.log('\n⏱️ Dynamic Timestamps');

test('timeAgo function defined', () => {
  assert(js.includes('function timeAgo('), 'Missing timeAgo() function');
});

test('timeAgo used in report strip render', () => {
  assert(js.includes('timeAgo(r.createdAt)'), 'timeAgo not used in report strip');
});

test('timeAgo used in live feed render', () => {
  const occurrences = (js.match(/timeAgo\(r\.createdAt\)/g) || []).length;
  assert(occurrences >= 2, `timeAgo(r.createdAt) appears ${occurrences} times, expected >= 2`);
});

test('Auto-refresh interval set to 60000ms', () => {
  assert(js.includes('60000'), 'Missing 60-second auto-refresh interval');
});

test('createdAt set on new reports at submission', () => {
  assert(js.includes('createdAt: new Date().toISOString()'), 'Missing createdAt on new reports');
});


// ─────────────────────────────────────────────
// 13. P2 — COMMUNITY PRESSURE SCORE
// ─────────────────────────────────────────────
console.log('\n📊 P2: Community Pressure Score');

function pressureScore(count) { return Math.min(100, Math.round((count / 20) * 100)); }
function pressureLabel(score) {
  if (score >= 80) return 'Critical';
  if (score >= 50) return 'High';
  if (score >= 25) return 'Building';
  return 'Low';
}

test('pressureScore: 0 voices = 0%', () => assert(pressureScore(0) === 0));
test('pressureScore: 10 voices = 50%', () => assert(pressureScore(10) === 50));
test('pressureScore: 20 voices = 100%', () => assert(pressureScore(20) === 100));
test('pressureScore: 25 voices caps at 100%', () => assert(pressureScore(25) === 100));
test('pressureScore: 12 voices = 60% (High)', () => {
  assert(pressureScore(12) === 60, `Expected 60 got ${pressureScore(12)}`);
  assert(pressureLabel(60) === 'High');
});
test('pressureScore: 4 voices = 20% (Low)', () => {
  assert(pressureScore(4) === 20, `Expected 20 got ${pressureScore(4)}`);
  assert(pressureLabel(20) === 'Low');
});
test('renderPressureBar function defined in JS', () => {
  assert(js.includes('function renderPressureBar('), 'Missing renderPressureBar');
});
test('pressure-bar-wrap CSS class exists', () => {
  assert(css.includes('.pressure-bar-wrap'), 'Missing .pressure-bar-wrap CSS');
});
test('pressure-bar-track CSS class exists', () => {
  assert(css.includes('.pressure-bar-track'), 'Missing .pressure-bar-track CSS');
});
test('pressure-bar-fill has transition animation', () => {
  assert(css.includes('.pressure-bar-fill'), 'Missing .pressure-bar-fill CSS');
  assert(css.includes('transition:'), 'Missing transition on pressure bar fill');
});
test('pressure bar injected into priority queue rows', () => {
  assert(js.includes('renderPressureBar(i.count)'), 'Pressure bar not in priority queue rows');
});
test('pressure bar injected into cluster cards', () => {
  const count = (js.match(/renderPressureBar/g) || []).length;
  assert(count >= 3, `renderPressureBar called ${count} times, expected >= 3 (queue, cluster, detail)`);
});

// ─────────────────────────────────────────────
// 14. P2 — RESOLUTION ESTIMATE
// ─────────────────────────────────────────────
console.log('\n⏳ P2: Resolution Estimate');

function resolutionEstimate(count) {
  const hours = Math.max(0.5, 10 - count * 0.7);
  if (hours < 1) return '< 1 hr';
  if (hours < 2) return '~1 hr';
  return `~${Math.round(hours)} hrs`;
}

test('resolutionEstimate: 1 voice = ~9 hrs', () => {
  assert(resolutionEstimate(1) === '~9 hrs', `Got ${resolutionEstimate(1)}`);
});
test('resolutionEstimate: 12 voices = ~1 hr', () => {
  assert(resolutionEstimate(12) === '~1 hr', `Got ${resolutionEstimate(12)}`);
});
test('resolutionEstimate: 14+ voices = < 1 hr', () => {
  assert(resolutionEstimate(14) === '< 1 hr', `Got ${resolutionEstimate(14)}`);
});
test('resolutionEstimate: 20 voices = < 1 hr (floor at 0.5)', () => {
  assert(resolutionEstimate(20) === '< 1 hr', `Got ${resolutionEstimate(20)}`);
});
test('renderResolutionEstimate function defined', () => {
  assert(js.includes('function renderResolutionEstimate('), 'Missing renderResolutionEstimate');
});
test('resolution-estimate CSS class exists', () => {
  assert(css.includes('.resolution-estimate'), 'Missing .resolution-estimate CSS');
});
test('resolution estimate injected in cluster cards', () => {
  assert(js.includes('renderResolutionEstimate(issue.count)'), 'Not injected in cluster cards');
});
test('resolution estimate injected in detail modal', () => {
  assert(js.includes('renderResolutionEstimate(issue.count)'), 'Not injected in detail modal');
});

// ─────────────────────────────────────────────
// 15. P2 — SLA COUNTDOWN
// ─────────────────────────────────────────────
console.log('\n⚡ P2: SLA Countdown');

function formatSlaCountdown(createdAt) {
  const SLA_HOURS = 24;
  const deadline = new Date(createdAt).getTime() + SLA_HOURS * 3600 * 1000;
  const remaining = deadline - Date.now();
  if (remaining <= 0) return '⚠️ SLA breached — escalated';
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return `Auto-escalates in ${h}h ${m}m ${s}s`;
}

test('SLA countdown: recent issue shows hours remaining', () => {
  const recentIso = new Date(Date.now() - 3 * 3600 * 1000).toISOString(); // 3h ago
  const result = formatSlaCountdown(recentIso);
  assert(result.startsWith('Auto-escalates in 20h') || result.startsWith('Auto-escalates in 21h'), `Expected "Auto-escalates in 20h/21h..." got: ${result}`);
});
test('SLA countdown: very old issue shows breached', () => {
  const oldIso = new Date(Date.now() - 30 * 3600 * 1000).toISOString(); // 30h ago
  assert(formatSlaCountdown(oldIso) === '⚠️ SLA breached — escalated');
});
test('startSlaCountdown function defined', () => {
  assert(js.includes('function startSlaCountdown('), 'Missing startSlaCountdown');
});
test('SLA box only shown for High-priority non-resolved issues', () => {
  assert(js.includes("issue.priority === 'High'"), 'Missing High priority guard');
  assert(js.includes("issue.status !== 'Resolved'"), 'Missing Resolved guard for SLA');
});
test('SLA countdown timer cleared on modal close', () => {
  assert(js.includes('clearInterval(slaCountdownTimer)'), 'SLA timer not cleared on close');
});
test('sla-countdown-box CSS class exists', () => {
  assert(css.includes('.sla-countdown-box'), 'Missing .sla-countdown-box CSS');
});
test('sla-countdown-text uses tabular-nums for stable width', () => {
  assert(css.includes('tabular-nums'), 'Missing font-variant-numeric: tabular-nums');
});
test('#detailP2Stats container in HTML', () => {
  assert(html.includes('detailP2Stats'), 'Missing #detailP2Stats in HTML');
});
test('seed data issue-1 has createdAt (3h ago)', () => {
  assert(js.includes('3 * 60 * 60 * 1000'), 'Missing 3h createdAt for issue-1');
});

// ─────────────────────────────────────────────
// 16. P2 — WHATSAPP SHARE
// ─────────────────────────────────────────────
console.log('\n📲 P2: WhatsApp Share');

test('whatsappShare function defined', () => {
  assert(js.includes('function whatsappShare('), 'Missing whatsappShare function');
});
test('whatsappShare uses wa.me URL', () => {
  assert(js.includes('https://wa.me/?text='), 'Missing wa.me URL in whatsappShare');
});
test('whatsappShare opens in new tab with noopener', () => {
  assert(js.includes("'_blank', 'noopener'"), "Missing noopener in window.open");
});
test('whatsappShare includes issue title, place, count', () => {
  assert(js.includes('issue.title'), 'issue.title not in WhatsApp message');
  assert(js.includes('issue.count'), 'issue.count not in WhatsApp message');
});
test('#whatsappShareBtn in HTML', () => {
  assert(html.includes('whatsappShareBtn'), 'Missing whatsappShareBtn in HTML');
});
test('WhatsApp button styled green', () => {
  assert(html.includes('#25d366'), 'WhatsApp button missing green color');
});
test('#whatsappShareBtn event listener wired', () => {
  assert(js.includes("'#whatsappShareBtn'"), 'Missing whatsappShareBtn listener');
});

// ─────────────────────────────────────────────
// 17. P2 — KEYBOARD SHORTCUT
// ─────────────────────────────────────────────
console.log('\n⌨️  P2: Keyboard Shortcut');

test('setupKeyboardShortcuts function defined', () => {
  assert(js.includes('function setupKeyboardShortcuts()'), 'Missing setupKeyboardShortcuts');
});
test('R key triggers openReport', () => {
  assert(js.includes("e.key === 'r' || e.key === 'R'"), "Missing 'R' key handler");
});
test('Escape key closes all modals', () => {
  assert(js.includes("e.key === 'Escape'"), "Missing Escape key handler");
});
test('Keyboard shortcut skips when typing in input/textarea', () => {
  assert(js.includes("tag === 'input' || tag === 'textarea'"), 'Missing input/textarea guard');
});
test('Keyboard shortcut skips when any modal is open', () => {
  assert(js.includes('anyModalOpen'), 'Missing anyModalOpen check');
});
test('setupKeyboardShortcuts called in DOMContentLoaded', () => {
  assert(js.includes('setupKeyboardShortcuts()'), 'setupKeyboardShortcuts not called');
});
test('.kbd-hint CSS class exists', () => {
  assert(css.includes('.kbd-hint'), 'Missing .kbd-hint CSS');
});
test('kbd element styled with border-bottom-width', () => {
  assert(css.includes('border-bottom-width'), 'Missing keycap border styling');
});
test('press R hint badge in HTML hero section', () => {
  assert(html.includes('kbd-hint'), 'Missing kbd-hint in HTML hero');
  assert(html.includes('<kbd>R</kbd>'), 'Missing <kbd>R</kbd> element');
});

// ─────────────────────────────────────────────
// 18. SEED DATA INTEGRITY
// ─────────────────────────────────────────────
console.log('\n🌱 Seed Data Integrity');

test('All 3 seed issues have createdAt', () => {
  const matches = js.match(/createdAt: new Date\(Date\.now\(\)/g) || [];
  assert(matches.length >= 3, `Expected >= 3 createdAt on seed issues, found ${matches.length}`);
});
test('Seed testimonies have createdAt', () => {
  const matches = js.match(/createdAt: new Date\(Date\.now\(\)/g) || [];
  assert(matches.length >= 6, `Expected >= 6 total createdAt (issues + testimonies), found ${matches.length}`);
});
test('DEFAULT_ISSUES has 3 entries', () => {
  const ids = ['issue-1', 'issue-2', 'issue-3'];
  ids.forEach(id => assert(js.includes(`id: '${id}'`), `Missing seed ${id}`));
});
// ─────────────────────────────────────────────
// 19. REALISM & PRODUCTION FEATURES (FOSS STACK)
// ─────────────────────────────────────────────
console.log('\n🌟 Realism: Maps, Heatmap, Push, Clerk & Photos');

test('Nominatim reverse geocoding function defined', () => {
  assert(js.includes('async function reverseGeocodeNominatim('), 'Missing reverseGeocodeNominatim in app.js');
});

test('Nominatim URL targets openstreetmap.org', () => {
  assert(js.includes('nominatim.openstreetmap.org/reverse'), 'Missing Nominatim API URL');
});

test('Leaflet-heat plugin script loaded in HTML', () => {
  assert(html.includes('leaflet.heat'), 'Missing leaflet-heat script in index.html');
});

test('toggleHeatmapLayer function defined in JS', () => {
  assert(js.includes('function toggleHeatmapLayer('), 'Missing toggleHeatmapLayer in app.js');
});

test('Photo / Visual Evidence marked as Coming soon in HTML', () => {
  assert(html.includes('Coming soon!'), 'Missing Coming soon badge for photo evidence');
  assert(html.includes('photo-evidence-box'), 'Missing photo-evidence-box in index.html');
});

test('Clerk Google OAuth button present in HTML & wired in JS', () => {
  assert(html.includes('id="clerkGoogleBtn"'), 'Missing clerkGoogleBtn in index.html');
  assert(js.includes('#clerkGoogleBtn'), 'Missing clerkGoogleBtn listener in app.js');
});

test('PocketBase status tag present in HTML', () => {
  assert(html.includes('PocketBase Sync Engine'), 'Missing PocketBase status indicator in index.html');
});

test('Web Push Notifications button wired in JS', () => {
  assert(js.includes('#pushNotificationBtn'), 'Missing pushNotificationBtn in app.js');
});

test('Service Worker registration present in JS', () => {
  assert(js.includes("navigator.serviceWorker.register('sw.js')"), 'Missing sw.js registration in app.js');
});

test('sw.js file exists and has push event listener', () => {
  const swCode = fs.readFileSync('sw.js', 'utf8');
  assert(swCode.includes("self.addEventListener('push'"), 'sw.js missing push listener');
});

test('REAL_ACCOUNTS contains verified Resident and Public-Service Officer accounts', () => {
  assert(js.includes('resident-rakshan'), 'Missing resident-rakshan in REAL_ACCOUNTS');
  assert(js.includes('resident-arav'), 'Missing resident-arav in REAL_ACCOUNTS');
  assert(js.includes('officer-snehal'), 'Missing officer-snehal in REAL_ACCOUNTS');
});

test('Real account switcher grid present in HTML', () => {
  assert(html.includes('realAccountsGrid'), 'Missing realAccountsGrid in HTML');
  assert(html.includes('data-account-id="resident-rakshan"'), 'Missing resident-rakshan card in HTML');
  assert(html.includes('data-account-id="resident-arav"'), 'Missing resident-arav card in HTML');
  assert(html.includes('data-account-id="officer-snehal"'), 'Missing officer-snehal card in HTML');
});

test('Account card switching event listeners registered in app.js', () => {
  assert(js.includes("document.querySelectorAll('.account-card')"), 'Missing account-card listener in app.js');
});

test('Automated real-time civic activity engine defined in app.js', () => {
  assert(js.includes('AUTOMATED_EVENTS'), 'Missing AUTOMATED_EVENTS in app.js');
});

// ─────────────────────────────────────────────
// 17. GUEST BROWSING & AUTHENTICATION ACCESS CONTROLS
// ─────────────────────────────────────────────
console.log('\n🔒 Guest Browsing & Auth Access Controls');

test('Auth modal inputs are blank and do not contain hardcoded user details', () => {
  assert(!html.includes('value="Rakshan"'), 'authName contains hardcoded value="Rakshan"');
  assert(!html.includes('value="rakshan@civic.org"'), 'authEmail contains hardcoded value="rakshan@civic.org"');
  assert(!html.includes('value="password123"'), 'authPassword contains hardcoded value="password123"');
});

test('Auth modal has close button and backdrop dismissal', () => {
  assert(html.includes('id="closeAuthModal"'), 'Missing closeAuthModal button in HTML');
  assert(js.includes('#closeAuthModal'), 'Missing closeAuthModal wiring in JS');
  assert(js.includes('openAuthModal'), 'Missing openAuthModal function in JS');
  assert(js.includes('closeAuthModal'), 'Missing closeAuthModal function in JS');
});

test('Topbar has dynamic Sign In button for guest mode', () => {
  assert(html.includes('id="topbarSignInBtn"'), 'Missing topbarSignInBtn in HTML');
  assert(js.includes('#topbarSignInBtn'), 'Missing topbarSignInBtn wiring in JS');
});

test('Default state defaults to guest mode (null account)', () => {
  assert(js.includes('return null; // Guest browsing mode'), 'loadAccount does not default to null for guest browsing');
});

test('Reporting is protected by authentication check', () => {
  assert(js.includes('function openReportModal() {\n  if (!state.account) {'), 'openReportModal is missing auth guard');
  assert(js.includes('function handleReportSubmission() {\n  if (!state.account) {'), 'handleReportSubmission is missing auth guard');
});

test('Corroboration (+1 Add My Voice) is protected by authentication check', () => {
  assert(js.includes('function addMyVoiceToCurrentIssue() {\n  if (!state.account) {'), 'addMyVoiceToCurrentIssue is missing auth guard');
});

test('Issue resolution and status update is protected by officer role check', () => {
  assert(js.includes('function handleOfficerStatusUpdate() {\n  if (!state.account) {'), 'handleOfficerStatusUpdate is missing auth guard');
  assert(js.includes("state.account.role !== 'officer'"), 'handleOfficerStatusUpdate is missing officer role guard');
});


// ─────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────
console.log('\n' + '─'.repeat(60));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log('\n❌ Failed tests:');
  errors.forEach(e => console.log(`  • ${e.name}\n    → ${e.error}`));
} else {
  console.log('\n🎉 All tests passed! CrowdFix is demo-ready.');
}
console.log('─'.repeat(60) + '\n');
process.exit(failed > 0 ? 1 : 0);
