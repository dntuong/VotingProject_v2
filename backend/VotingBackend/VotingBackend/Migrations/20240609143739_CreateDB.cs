using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VotingBackend.Migrations
{
    /// <inheritdoc />
    public partial class CreateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "voting",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    voting_name = table.Column<string>(type: "text", nullable: false),
                    total_votings = table.Column<string>(type: "text", nullable: false),
                    total_candidates = table.Column<string>(type: "text", nullable: false),
                    max_votes = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_voting", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Vote",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    address_voter = table.Column<string>(type: "text", nullable: false),
                    list_vote = table.Column<List<string>>(type: "text[]", nullable: false),
                    votingIdid = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vote", x => x.id);
                    table.ForeignKey(
                        name: "FK_Vote_voting_votingIdid",
                        column: x => x.votingIdid,
                        principalTable: "voting",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vote_votingIdid",
                table: "Vote",
                column: "votingIdid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vote");

            migrationBuilder.DropTable(
                name: "voting");
        }
    }
}
