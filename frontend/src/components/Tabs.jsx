import React from 'react'

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
   <div className='w-full my-2'>
  <div className='flex flex-wrap bg-indigo-50 p-1 rounded-2xl border border-indigo-100'>
    {tabs.map((tab) => (
      <button
        key={tab.label}
        className={`relative flex-1 sm:flex-none py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold rounded-xl transition-all ${
          activeTab === tab.label
            ? 'bg-white text-indigo-700 shadow-lg'
            : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab(tab.label)}
      >
        <span className='relative z-10'>{tab.label}</span>
        {activeTab === tab.label && (
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-xl'>
            <div className='absolute inset-0 border-2 border-dashed border-indigo-300 rounded-xl'></div>
          </div>
        )}
      </button>
    ))}
  </div>
</div>


  )
}

export default Tabs