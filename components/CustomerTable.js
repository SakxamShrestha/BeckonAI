'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

function getCustomerStatus(customer) {
  if (customer.isNewLead) return { label: 'New Lead', variant: 'default', className: 'bg-blue-100 text-blue-700 hover:bg-blue-100' }
  if (!customer.lastVisitDate) return { label: 'New Lead', variant: 'default', className: 'bg-blue-100 text-blue-700 hover:bg-blue-100' }
  const daysSince = Math.floor(
    (Date.now() - new Date(customer.lastVisitDate).getTime()) / 86400000
  )
  if (daysSince > 45) return { label: 'Lapsed', variant: 'secondary', className: 'bg-amber-100 text-amber-700 hover:bg-amber-100' }
  return { label: 'Regular', variant: 'secondary', className: 'bg-green-100 text-green-700 hover:bg-green-100' }
}

function formatDate(date) {
  if (!date) return 'Never'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function CustomerTable({ customers }) {
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-3xl mb-2">👤</p>
          <p className="font-medium">No customers found</p>
          <p className="text-sm">
            {search ? 'Try a different search term' : 'Add your first customer below'}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                <TableHead className="hidden md:table-cell">Visits</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => {
                const status = getCustomerStatus(customer)
                return (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {formatDate(customer.lastVisitDate)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {customer.visitCount}
                    </TableCell>
                    <TableCell>
                      <Badge className={status.className}>{status.label}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
