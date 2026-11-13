'use client'

import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, Bell, BookOpen, CalendarDays, Check, ChevronDown, Clock3, Compass, Crown, Filter, Flame, Heart, LayoutDashboard, MapPin, Menu, Plus, Search, Settings2, Sparkles, Users, X } from 'lucide-react'

type Event = { id: number; title: string; category: string; date: string; month: string; time: string; location: string; attendees: number; color: string; image: string; featured?: boolean }

const initialEvents: Event[] = [
  { id: 1, title: 'The Great Campus Hackathon', category: 'Technology', date: '18', month: 'NOV', time: '9:00 AM – 6:00 PM', location: 'Tech Park, Block C', attendees: 248, color: 'violet', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=85', featured: true },
  { id: 2, title: 'Acoustic Evenings: Open Mic', category: 'Arts & Culture', date: '20', month: 'NOV', time: '5:30 PM – 8:00 PM', location: 'Main Auditorium', attendees: 96, color: 'orange', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80' },
  { id: 3, title: 'Sunrise 5K — Run for a Cause', category: 'Sports', date: '23', month: 'NOV', time: '6:00 AM – 8:30 AM', location: 'University Sports Ground', attendees: 182, color: 'green', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=700&q=80' },
]
const categories = ['All events', 'Technology', 'Arts & Culture', 'Sports']
const clubs = [
  { name: 'The Robotics Society', area: 'Technology', members: '1.2k', icon: '⚙', tint: 'club-violet' },
  { name: 'Pixel Perfect', area: 'Design & Media', members: '840', icon: '◈', tint: 'club-pink' },
  { name: 'Green Campus Collective', area: 'Sustainability', members: '620', icon: '✳', tint: 'club-green' },
]

export default function Page() {
  const [events, setEvents] = useState(initialEvents)
  const [category, setCategory] = useState('All events')
  const [query, setQuery] = useState('')
  const [registered, setRegistered] = useState<number[]>([])
  const [joined, setJoined] = useState<string[]>([])
  const [view, setView] = useState('Overview')
  const [showAll, setShowAll] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleEvents = useMemo(() => events.filter(event => (category === 'All events' || event.category === category) && event.title.toLowerCase().includes(query.toLowerCase())), [events, category, query])
  const registrationCount = 2 + registered.length

  function addEvent() {
    const nextId = Math.max(...events.map(event => event.id)) + 1
    setEvents([{ id: nextId, title: 'Designing Your Future: Portfolio Lab', category: 'Arts & Culture', date: '26', month: 'NOV', time: '2:00 PM – 4:30 PM', location: 'Innovation Hub, Room 204', attendees: 54, color: 'pink', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80' }, ...events])
    setView('Events')
  }

  return (
    <main className="portal-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" aria-label="CampusConnect home"><span className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></span><span>campus<span className="brand-light">connect</span><small>SRMIST · KATTANKULATHUR</small></span></a>
        <div className="side-label">YOUR CAMPUS</div>
        <nav className="side-nav" aria-label="Main navigation">
          {[['Overview', LayoutDashboard], ['Events', CalendarDays], ['Explore clubs', Users], ['My registrations', BookOpen]].map(([label, Icon]) => <button key={label as string} className={`nav-item ${view === label ? 'nav-active' : ''}`} onClick={() => { setView(label as string); setMenuOpen(false) }}><Icon size={18} /><span>{label as string}</span>{label === 'My registrations' && <span className="nav-count">{registrationCount}</span>}</button>)}
        </nav>
        <div className="side-label community-label">COMMUNITY</div>
        <nav className="side-nav" aria-label="Community navigation">
          <button className={`nav-item ${view === 'Coordinator' ? 'nav-active' : ''}`} onClick={() => setView('Coordinator')}><Sparkles size={18} /><span>Coordinator view</span></button>
          <button className={`nav-item ${view === 'Admin' ? 'nav-active' : ''}`} onClick={() => setView('Admin')}><Settings2 size={18} /><span>Admin dashboard</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="semester-card"><span className="semester-icon"><CalendarDays size={15} /></span><div><strong>Fall semester</strong><span>November · Week 3</span></div><ChevronDown size={15} /></div><div className="profile-card"><div className="avatar">S</div><div className="profile-copy"><strong>Student</strong><span>SRM Institute of Science<br />and Technology</span></div><button className="icon-button profile-more" aria-label="Profile options"><MoreIcon /></button></div></div>
      </aside>
      {menuOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <section className="main-panel" id="home">
        <header className="topbar"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={20} /></button><div className="breadcrumb">Campus <span>/</span> <b>{view}</b></div><div className="top-actions"><label className="search-box"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events, clubs..." aria-label="Search events and clubs" /><kbd>⌘ K</kbd></label><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="top-avatar" aria-label="Student profile">S</div></div></header>
        <div className="content-area">
          {view === 'Overview' ? <>
            <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot" /> YOUR CAMPUS, YOUR COMMUNITY</div><h1>Good morning, Student <span className="wave">✳</span></h1><p className="subheading">Here&apos;s what&apos;s happening around campus this week.</p></div><button className="outline-button date-button"><CalendarDays size={16} /> Nov 17 – 23 <ChevronDown size={15} /></button></div>
            <div className="stats-grid"><article className="stat-card"><div className="stat-top"><span className="stat-icon lilac"><CalendarDays size={17} /></span><span className="stat-trend">+2 this week <ArrowDownRight size={13} /></span></div><strong>12</strong><span className="stat-label">Events this month</span><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div></article><article className="stat-card"><div className="stat-top"><span className="stat-icon mint"><Users size={17} /></span><span className="stat-trend">+1 this semester <ArrowDownRight size={13} /></span></div><strong>4</strong><span className="stat-label">Clubs you&apos;re in</span><div className="avatar-stack"><span>R</span><span>P</span><span>G</span><span>+1</span><small>Good company.</small></div></article><article className="stat-card stat-highlight"><div className="stat-top"><span className="stat-icon gold"><Crown size={17} /></span><span className="highlight-label">CAMPUS PICK</span></div><strong>Hackathon<br />week is here</strong><span className="highlight-foot">Your next big idea starts here <ArrowRight size={14} /></span><span className="highlight-spark">✳</span></article></div>

            <section className="events-section"><div className="section-heading"><div><div className="eyebrow section-eyebrow"><Flame size={14} /> THE BUZZ</div><h2>Happening around you</h2></div><button className="text-button" onClick={() => { setView('Events'); setShowAll(true) }}>Explore all events <ArrowRight size={15} /></button></div>
              <div className="filter-row"><div className="category-tabs" role="tablist" aria-label="Filter events">{categories.map(item => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'category-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><button className="filter-button" onClick={() => setCategory(category === 'All events' ? 'Technology' : 'All events')}><Filter size={15} /> Filter</button></div>
              <div className="event-grid">{visibleEvents.slice(0, showAll ? 10 : 3).map(event => <article className={`event-card ${event.featured ? 'event-featured' : ''}`} key={event.id}><div className="event-image-wrap"><img src={event.image} alt="" className="event-image" /><span className="event-category">{event.category}</span><button className="heart-button" aria-label={`Save ${event.title}`}><Heart size={17} /></button>{event.featured && <span className="featured-tag"><Sparkles size={12} /> TRENDING</span>}</div><div className="event-card-body"><div className="event-date"><strong>{event.date}</strong><span>{event.month}</span></div><div className="event-info"><h3>{event.title}</h3><div className="event-meta"><span><Clock3 size={13} /> {event.time}</span><span><MapPin size={13} /> {event.location}</span></div><div className="event-footer"><div className="attendee-row"><div className="tiny-avatars"><i>A</i><i>M</i><i>J</i></div><span>{event.attendees} going</span></div><button className={`register-button ${registered.includes(event.id) ? 'registered-button' : ''}`} onClick={() => setRegistered(current => current.includes(event.id) ? current.filter(id => id !== event.id) : [...current, event.id])}>{registered.includes(event.id) ? <><Check size={14} /> Registered</> : <>Join event <ArrowRight size={14} /></>}</button></div></div></div></article>)}</div>
              {visibleEvents.length === 0 && <div className="empty-state">No events match your search. Try another keyword.</div>}
            </section>

            <section className="clubs-section"><div className="section-heading"><div><div className="eyebrow section-eyebrow"><Users size={14} /> FIND YOUR PEOPLE</div><h2>Clubs worth joining</h2></div><button className="text-button" onClick={() => setView('Explore clubs')}>Browse all clubs <ArrowRight size={15} /></button></div><div className="club-grid">{clubs.map(club => <article className="club-card" key={club.name}><div className={`club-symbol ${club.tint}`}>{club.icon}</div><div className="club-text"><h3>{club.name}</h3><span>{club.area} <i /> {club.members} members</span></div><button className={`join-button ${joined.includes(club.name) ? 'joined-button' : ''}`} onClick={() => setJoined(current => current.includes(club.name) ? current.filter(name => name !== club.name) : [...current, club.name])}>{joined.includes(club.name) ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join</>}</button></article>)}</div></section>
            <footer className="footnote"><span>Made for the moments between lectures.</span><span>SRM Institute of Science and Technology <i /> Est. 1985</span></footer>
          </> : <div className="alternate-view"><div className="eyebrow"><span className="live-dot" /> CAMPUSCONNECT · SRMIST</div><h1>{view === 'Events' ? 'Find your next thing.' : view === 'Explore clubs' ? 'Find your people.' : view === 'My registrations' ? 'Your campus plans.' : view === 'Coordinator' ? 'Make it happen.' : 'The campus pulse.'}</h1><p className="subheading">{view === 'Coordinator' ? 'A sample workspace for organizing campus events.' : view === 'Admin' ? 'A sample overview of campus activity.' : `Discover what’s happening at SRM Institute of Science and Technology.`}</p>{(view === 'Coordinator' || view === 'Admin') && <div className="role-notice"><Sparkles size={18} /><div><strong>{view} tools are in demo mode</strong><span>This sample workspace uses illustrative data. No real account or campus system is connected.</span></div></div>}{view === 'Coordinator' && <button className="primary-button create-event" onClick={addEvent}><Plus size={16} /> Create sample event</button>}{view === 'Admin' && <div className="admin-metrics"><div><strong>{events.length + 9}</strong><span>Upcoming events</span></div><div><strong>28</strong><span>Active clubs</span></div><div><strong>3.8k</strong><span>Student members</span></div></div>}{view === 'Explore clubs' ? <div className="club-grid alt-clubs">{clubs.map(club => <article className="club-card" key={club.name}><div className={`club-symbol ${club.tint}`}>{club.icon}</div><div className="club-text"><h3>{club.name}</h3><span>{club.area} <i /> {club.members} members</span></div><button className={`join-button ${joined.includes(club.name) ? 'joined-button' : ''}`} onClick={() => setJoined(current => current.includes(club.name) ? current.filter(name => name !== club.name) : [...current, club.name])}>{joined.includes(club.name) ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join</>}</button></article>)}</div> : <section className="events-section alt-events"><div className="section-heading"><div><div className="eyebrow section-eyebrow"><CalendarDays size={14} /> {view === 'My registrations' ? 'YOUR RSVP LIST' : 'UP NEXT'}</div><h2>{view === 'My registrations' ? `${registrationCount} events on your calendar` : 'Campus events'}</h2></div></div><div className="event-grid">{(view === 'My registrations' ? events.filter(event => registered.includes(event.id) || event.id < 3).slice(0, 3) : events.slice(0, 3)).map(event => <article className="event-card" key={event.id}><div className="event-image-wrap"><img src={event.image} alt="" className="event-image" /><span className="event-category">{event.category}</span></div><div className="event-card-body"><div className="event-date"><strong>{event.date}</strong><span>{event.month}</span></div><div className="event-info"><h3>{event.title}</h3><div className="event-meta"><span><Clock3 size={13} /> {event.time}</span><span><MapPin size={13} /> {event.location}</span></div><div className="event-footer"><span className="attendee-row">{event.attendees} going</span><button className={`register-button ${registered.includes(event.id) ? 'registered-button' : ''}`} onClick={() => setRegistered(current => current.includes(event.id) ? current.filter(id => id !== event.id) : [...current, event.id])}>{registered.includes(event.id) ? <><Check size={14} /> Registered</> : <>Join event <ArrowRight size={14} /></>}</button></div></div></div></article>)}</div></section>}<button className="text-button back-button" onClick={() => setView('Overview')}><ArrowRight size={15} /> Back to overview</button></div>}
        </div>
      </section>
    </main>
  )
}

function MoreIcon() { return <span className="more-dots" aria-hidden="true">•••</span> }
