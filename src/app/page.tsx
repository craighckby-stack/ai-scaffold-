'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, Cpu, Shield, Database, Users, Zap, Lock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">OMEGA</h1>
              <p className="text-xs text-muted-foreground">
                Omni-Model Emergent General Intelligence
              </p>
            </div>
          </div>
          <nav className="flex gap-4">
            <Link href="/reasoning">
              <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                Reasoning
              </button>
            </Link>
            <Link href="/agents">
              <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                Agents
              </button>
            </Link>
            <Link href="/memory">
              <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                Memory
              </button>
            </Link>
            <Link href="/security">
              <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                Security
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-4">Welcome to OMEGA</h2>
            <p className="text-sm text-muted-foreground">
              OMEGA unifies consciousness, reasoning, memory, agent swarms, security,
              and self-improvement into a coherent AI system. Navigate through the
              modules below to explore each component.
            </p>
          </div>

          {/* System Status */}
          <div>
            <h2 className="text-lg font-semibold mb-4">System Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Consciousness', status: 'ACTIVE', icon: Brain },
                { name: 'Reasoning', status: 'ACTIVE', icon: Cpu },
                { name: 'Memory', status: 'ACTIVE', icon: Database },
                { name: 'Agents', status: 'ACTIVE', icon: Users },
                { name: 'Security', status: 'ACTIVE', icon: Shield },
                { name: 'Learning', status: 'IDLE', icon: Zap },
              ].map((item, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-card">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <item.icon className={`h-4 w-4 ${
                      item.status === 'ACTIVE' ? 'text-green-500' :
                      item.status === 'IDLE' ? 'text-yellow-500' :
                      'text-red-500'
                    }`} />
                  </div>
                  <div className="text-2xl font-bold">
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/reasoning" className="block">
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <Cpu className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-sm font-medium">New Query</h3>
                  <p className="text-xs text-muted-foreground">
                    Submit a query for ethical reasoning
                  </p>
                </div>
              </Link>
              <Link href="/agents" className="block">
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-sm font-medium">View Agents</h3>
                  <p className="text-xs text-muted-foreground">
                    Explore the 17 specialized AI agents
                  </p>
                </div>
              </Link>
              <Link href="/memory" className="block">
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-sm font-medium">Memory Browser</h3>
                  <p className="text-xs text-muted-foreground">
                    Browse knowledge graph and experiences
                  </p>
                </div>
              </Link>
              <Link href="/security" className="block">
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-sm font-medium">System Logs</h3>
                  <p className="text-xs text-muted-foreground">
                    View security events and encryption logs
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            OMEGA v1.0.0 - Unified AI Architecture
          </p>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500">Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
