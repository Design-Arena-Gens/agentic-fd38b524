'use client';

import { useState, useMemo } from 'react';
import { Search, Package, Cpu, Wrench, GitBranch, Shield, Crown, Users, Filter, X } from 'lucide-react';
import { plugins, tierInfo, stats } from '@/lib/data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');
  const [selectedPlugin, setSelectedPlugin] = useState<string | null>(null);

  const filteredPlugins = useMemo(() => {
    return plugins.filter(plugin => {
      const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || plugin.type === selectedType;
      const matchesTier = selectedTier === 'all' || plugin.tier === selectedTier;
      return matchesSearch && matchesType && matchesTier;
    });
  }, [searchQuery, selectedType, selectedTier]);

  const typeIcons = {
    agent: Cpu,
    skill: Package,
    tool: Wrench,
    orchestrator: GitBranch,
  };

  const typeColors = {
    agent: 'bg-purple-500',
    skill: 'bg-blue-500',
    tool: 'bg-green-500',
    orchestrator: 'bg-orange-500',
  };

  const selectedPluginData = selectedPlugin ? plugins.find(p => p.id === selectedPlugin) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Agents Main</h1>
                <p className="text-slate-400 text-sm">Multi-Agent AI Orchestration System</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.totalAgents}</div>
                <div className="text-slate-400">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.totalSkills}</div>
                <div className="text-slate-400">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.totalTools}</div>
                <div className="text-slate-400">Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.totalOrchestrators}</div>
                <div className="text-slate-400">Orchestrators</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Queen & Hive Overview */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Queen & Hive Orchestration</h2>
              <p className="text-purple-200 mb-4">
                Hierarchical multi-agent coordination where the Queen (main Claude) orchestrates Hive workers (specialized sub-agents)
                with tier-based permissions for safe, efficient task execution.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {tierInfo.map((tier) => (
                  <div key={tier.tier} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                      <h3 className="font-semibold text-white">Tier {tier.tier}: {tier.name}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{tier.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tier.permissions.map((perm) => (
                        <span key={perm} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search plugins by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">Filter:</span>
            </div>

            {/* Type Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'all' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setSelectedType('agent')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'agent' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Agents
              </button>
              <button
                onClick={() => setSelectedType('skill')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'skill' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setSelectedType('tool')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'tool' ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Tools
              </button>
              <button
                onClick={() => setSelectedType('orchestrator')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'orchestrator' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Orchestrators
              </button>
            </div>

            <div className="w-px h-6 bg-slate-700"></div>

            {/* Tier Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTier('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedTier === 'all' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Tiers
              </button>
              {[1, 2, 3].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTier === tier ? tierInfo[tier - 1].color.replace('bg-', 'bg-') + ' text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Tier {tier}
                </button>
              ))}
            </div>

            {(selectedType !== 'all' || selectedTier !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedTier('all');
                  setSearchQuery('');
                }}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-slate-400">
          Showing {filteredPlugins.length} of {plugins.length} plugins
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlugins.map((plugin) => {
            const Icon = typeIcons[plugin.type];
            const tierData = tierInfo[plugin.tier - 1];

            return (
              <div
                key={plugin.id}
                onClick={() => setSelectedPlugin(plugin.id)}
                className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-purple-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${typeColors[plugin.type]} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${tierData.color}`}></div>
                    <span className="text-xs text-slate-400">Tier {plugin.tier}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{plugin.name}</h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{plugin.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">
                    {plugin.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    plugin.tokenUsage === 'minimal' ? 'bg-green-900 text-green-300' :
                    plugin.tokenUsage === 'moderate' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {plugin.tokenUsage} tokens
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPlugins.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No plugins found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Plugin Detail Modal */}
      {selectedPluginData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlugin(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`${typeColors[selectedPluginData.type]} p-3 rounded-lg`}>
                    {(() => {
                      const Icon = typeIcons[selectedPluginData.type];
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedPluginData.name}</h2>
                    <p className="text-slate-400">{selectedPluginData.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlugin(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-slate-300 mb-6">{selectedPluginData.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Type</div>
                  <div className="text-white font-semibold capitalize">{selectedPluginData.type}</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Permission Tier</div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${tierInfo[selectedPluginData.tier - 1].color}`}></div>
                    <div className="text-white font-semibold">Tier {selectedPluginData.tier}</div>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Token Usage</div>
                  <div className="text-white font-semibold capitalize">{selectedPluginData.tokenUsage}</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Risk Level</div>
                  <div className="text-white font-semibold">{tierInfo[selectedPluginData.tier - 1].riskLevel}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Permissions</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPluginData.permissions.map((perm) => (
                    <span key={perm} className="bg-slate-900 text-slate-300 px-3 py-1 rounded-lg text-sm">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPluginData.dependencies && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <GitBranch className="w-4 h-4" />
                    <span>Dependencies</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPluginData.dependencies.map((dep) => (
                      <span key={dep} className="bg-slate-900 text-purple-300 px-3 py-1 rounded-lg text-sm">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-900 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-2">Installation Command</div>
                <code className="text-green-400 font-mono text-sm bg-slate-950 px-3 py-2 rounded block">
                  {selectedPluginData.installCommand}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
