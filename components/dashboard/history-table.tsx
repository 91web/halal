"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface HistoryItem {
  _id: string;
  ingredient: string;
  analysis: {
    status: string;
    reason: string;
  };
  timestamp: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: HistoryItem | null;
}

function HistoryModal({ isOpen, onClose, selectedItem }: HistoryModalProps) {
  if (!selectedItem) return null;

  function getStatusColor(status: string | undefined): string {
    const s = typeof status === "string" ? status.toLowerCase() : String(status || "").toLowerCase();
    switch (s) {
      case "halal":
        return "bg-green-100 text-green-800";
      case "haram":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Analysis Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Ingredient:</p>
            <p className="capitalize">{selectedItem.ingredient}</p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <Badge
              variant="outline"
              className={getStatusColor(selectedItem.analysis.status)}
            >
              {selectedItem.analysis.status}
            </Badge>
          </div>
          <div>
            <p className="font-medium">Reason:</p>
            <p>{selectedItem.analysis.reason}</p>
          </div>
          <div>
            <p className="font-medium">Date:</p>
            <p>{format(new Date(selectedItem.timestamp), "MMM d, yyyy")}</p>
            <p>{format(new Date(selectedItem.timestamp), "h:mm a")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function HistoryTable() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setHistory(data);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "halal":
        return "bg-green-100 text-green-800";
      case "haram":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) return <div>Loading history...</div>;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Analysis History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow
                key={item._id}
                onClick={() => handleRowClick(item)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="font-medium capitalize">
                  {item.ingredient}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(item.analysis.status)}
                  >
                    {item.analysis.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {item.analysis.reason}
                </TableCell>
                <TableCell>
                  {format(new Date(item.timestamp), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
            {history.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No analysis history found. Start searching!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <HistoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
      />
    </Card>
  );
}
